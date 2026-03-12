'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userData.user.id)
        .single();
      
      if (data) setProfile(data);
      setLoading(false);
    }

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Başarıyla çıkış yapıldı');
      router.push('/login');
    } catch (err: any) {
      toast.error('Çıkış yapılırken bir hata oluştu');
      console.error(err);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${profile.id}-${Math.random()}.${fileExt}`;
    const filePath = `logos/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('ugc-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('ugc-images').getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ brand_logo_url: publicUrl })
        .eq('id', profile.id);

      if (updateError) throw updateError;

      setProfile({ ...profile, brand_logo_url: publicUrl });
      toast.success('Logo başarıyla yüklendi');
    } catch (err: any) {
      console.error('Upload error:', err);
      toast.error('Logo yüklenirken bir hata oluştu');
    } finally {
      setUploading(false);
    }
  };

  const showComingSoon = () => {
    toast.info('Bu özellik yakında eklenecek!');
  };

  if (loading) {
    return <div className="w-full min-h-screen flex items-center justify-center text-white">Yükleniyor...</div>;
  }

  return (
    <div className="w-full min-h-[95vh] flex flex-col px-5 pt-12 pb-32 bg-background relative overflow-y-auto">
      
      {/* Background glowing effects */}
      <div className="absolute top-0 right-[-20%] w-[300px] h-[300px] rounded-full bg-[#7f0df2]/10 blur-[100px] pointer-events-none" />

      {/* Header Info */}
      <div className="mb-8 z-10 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7f0df2] to-[#c892ff] flex items-center justify-center text-white text-xl font-bold border-2 border-[#151221]">
          {profile?.full_name?.charAt(0) || 'U'}
        </div>
        <div>
           <h1 className="text-[24px] font-extrabold text-white leading-tight tracking-tight">
             Profil
           </h1>
           <p className="text-[#0cdfcd] text-[14px] font-medium">{profile?.credits || 0} Kredi Mevcut</p>
        </div>
      </div>

      <div className="z-10 flex flex-col gap-5 w-full">
         <Link href="/pricing" className="w-full bg-gradient-to-r from-[#151221] to-[#1f1a2e] p-5 rounded-[20px] border border-[#7f0df2]/30 flex items-center justify-between hover:border-[#7f0df2]/60 transition-colors shadow-[0_0_20px_rgba(127,13,242,0.1)]">
            <div className="flex items-center gap-3">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7f0df2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
               <span className="text-white font-semibold text-[15px]">Premium&apos;a Geç</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a19daf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
         </Link>

         {/* Marka Kiti (Brand Kit) */}
         <div className="w-full bg-[#151221] p-5 rounded-[20px] border border-[#261f3d] flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0cdfcd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
               <h2 className="text-white font-bold text-[16px]">Marka Kiti</h2>
            </div>
            <p className="text-[#a19daf] text-[13px] leading-relaxed">
              Logonuzu ve marka renklerinizi ekleyin. Üretilen tüm videolara otomatik logo watermark eklenecektir.
            </p>
            
            <div className="flex gap-4 mt-2">
              <label className="flex-1 py-3 rounded-xl border border-dashed border-[#504a62] text-[#a19daf] text-[13px] font-medium flex flex-col items-center justify-center gap-2 hover:border-[#7f0df2] hover:text-white transition-colors bg-[#110e1b] cursor-pointer relative overflow-hidden">
                 <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} disabled={uploading} />
                 {profile?.brand_logo_url ? (
                   <img src={profile.brand_logo_url} alt="Brand Logo" className="w-10 h-10 object-contain" />
                 ) : (
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                 )}
                 {uploading ? 'Yükleniyor...' : profile?.brand_logo_url ? 'Logoyu Değiştir' : 'Logo Yükle'}
              </label>
              <button onClick={showComingSoon} className="flex-1 py-3 rounded-xl border border-[#261f3d] text-[#e4e4e9] text-[13px] font-medium flex flex-col items-center justify-center gap-2 hover:bg-[#1a152e] transition-colors bg-[#110e1b]">
                 <div className="flex gap-1">
                    <div className="w-4 h-4 rounded-full bg-[#7f0df2] border border-[#261f3d]" />
                    <div className="w-4 h-4 rounded-full bg-[#0cdfcd] border border-[#261f3d] -ml-2" />
                 </div>
                 Renk Seçimi
              </button>
            </div>
         </div>

         {/* Ayarlar */}
         <div className="w-full bg-[#151221] p-5 rounded-[20px] border border-[#261f3d] flex flex-col gap-4">
            <button onClick={showComingSoon} className="flex items-center justify-between group w-full">
               <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a19daf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-white transition-colors"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                  <span className="text-[#e4e4e9] font-medium text-[15px] group-hover:text-white transition-colors">Ayarlar</span>
               </div>
            </button>
            <div className="h-px w-full bg-[#261f3d]" />
            <button onClick={handleLogout} className="flex items-center justify-between group w-full text-left">
               <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                  <span className="text-[#ef4444] font-medium text-[15px]">Çıkış Yap</span>
               </div>
            </button>
         </div>
      </div>
      
    </div>
  );
}
