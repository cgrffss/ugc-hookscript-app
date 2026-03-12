'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// N8n Webform details (Webhook POST Endpoint)
const N8N_WEBHOOK_URL = "https://saul444.app.n8n.cloud/webhook/e8b6ea01-f90f-4801-a34c-d2a68dc3b4b5"; 
// Note: form urls end in `/form/id`, but for API POSTs it's usually `/webhook/id`.
// If it only accepts form submissions, we may need to use FormData or just send JSON to webhook.

export default function DashboardPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000"); // default mockup image
  const [productName, setProductName] = useState("High-end Headphones");

  const tags = ['#minimal', '#luxury', '#cyberpunk', '#nature'];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setProductName(file.name.split('.')[0]); // Just a mock extrapolation
    }
  };

  const handleGenerate = async () => {
    setLoading(true);

    try {
      // 0. Mock Credit Check
      // Normally: const { data: profile } = await supabase.from('profiles').select('credits').eq('id', user.id).single();
      const userRes = await supabase.auth.getUser();
      const user = userRes.data.user;
      
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('credits').eq('id', user.id).single();
        if (profile && profile.credits <= 0) {
          toast.error("Yetersiz Kredi! Lütfen paketinizi yükseltin.");
          router.push('/pricing');
          setLoading(false);
          return;
        }
        if (profile && profile.credits > 0) {
          await supabase.from('profiles').update({ credits: profile.credits - 1 }).eq('id', user.id);
        }
      }

      // Show immediate feedback to user
      toast.success("Ajanımız içeriklerinizi hazırlıyor. Bu işlem 2-5 dakika sürebilir, sonuçlar paneline düşecek.", {
        duration: 5000,
      });

      let finalImageUrl = imagePreview; // Default to mockup

      // 1. Upload to Supabase if local file exists
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('ugc-images')
          .upload(filePath, imageFile);

        if (!uploadError) {
          const { data } = supabase.storage.from('ugc-images').getPublicUrl(filePath);
          finalImageUrl = data.publicUrl;
        }
      }

      // 1.5 Create Record in Supabase to get an ID for n8n to reference back
      const { data: genData } = await supabase
        .from('generations')
        .insert([{
          user_id: user?.id,
          product_name: productName,
          prompt: prompt,
          input_image: finalImageUrl,
          status: 'processing'
        }])
        .select()
        .single();

      // 2. Fire to N8n (Fire and forget, with record_id)
      const payload = {
        record_id: genData?.id,
        image_url: finalImageUrl,
        prompt: prompt,
        product_name: productName
      };

      fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.error("Webhook Error:", err));

      // 3. Clear form and go to history (or stay on dashboard)
      setPrompt('');
      setImageFile(null);
      setImagePreview("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000");
      setProductName("High-end Headphones");

    } catch (err) {
      console.error(err);
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSuggestPrompt = async () => {
    setSuggestionLoading(true);
    try {
      let base64 = null;
      if (imageFile) {
        base64 = await fileToBase64(imageFile);
      }
      
      const res = await fetch('/api/suggest-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          tags,
          imageBase64: base64
        })
      });

      const data = await res.json();
      if (data.prompt) {
        setPrompt(data.prompt);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSuggestionLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col px-5 pt-12 pb-32">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <button className="text-white hover:bg-white/10 p-2 -ml-2 rounded-full transition-colors" onClick={() => router.back()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <span className="text-[17px] font-bold text-white tracking-wide">İçerik Oluşturucu</span>
        <button onClick={() => toast.info('Bu özellik yakında eklenecek!')} className="text-white hover:bg-white/10 p-2 -mr-2 rounded-full">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </div>

      {/* Header Info */}
      <div className="mb-8">
        <h1 className="text-[32px] font-extrabold text-white leading-tight mb-2 tracking-tight">
          Nasıl bir içerik<br />istiyorsun?
        </h1>
        <p className="text-[#a19daf] text-[14px]">
          Yapay zeka ile ürününü profesyonel bir sahneye taşı.
        </p>
      </div>

      {/* Section 1: Uploaded Product */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 rounded-full bg-[#251b3a] text-[#7f0df2] flex items-center justify-center text-[12px] font-bold border border-[#7f0df2]/30">
            1
          </div>
          <span className="text-white font-semibold text-[15px]">Yüklenen Ürün</span>
        </div>

        {/* Product Card Mockup with File Input */}
        <div className="w-full bg-[#151221] rounded-[24px] overflow-hidden border border-[#261f3d] relative">
          
          {/* Edit Button / File Input Trigger */}
          <label className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center z-10 border border-white/10 hover:bg-black/60 transition-colors cursor-pointer">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
          </label>

          {/* Product Image Gradient Overlay */}
          <div className="relative aspect-square w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-[#151221] via-transparent to-black/20 z-[1]"></div>
            <img 
              src={imagePreview} 
              alt="Upload" 
              className="w-full h-full object-cover rounded-t-[24px]"
            />
          </div>

          <div className="relative z-10 p-5 -mt-20">
            <h3 className="text-xl font-bold text-white mb-1.5 drop-shadow-md">{productName}</h3>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#7f0df2" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.25 14.5l-4.5-4.5 1.06-1.06 3.44 3.44 8.44-8.44 1.06 1.06-9.5 9.5z" fill="#7f0df2"/></svg>
              <span className="text-[#a19daf] text-[13px]">Premium ses deneyimi algılandı</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Prompt */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 rounded-full bg-[#251b3a] text-[#7f0df2] flex items-center justify-center text-[12px] font-bold border border-[#7f0df2]/30">
            2
          </div>
          <span className="text-white font-semibold text-[15px]">Yaratıcı Prompt</span>
        </div>

        <div className="relative w-full bg-[#151221] rounded-[24px] border border-[#261f3d] p-5 pb-16">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-transparent text-[#e4e4e9] text-[15px] resize-none focus:outline-none min-h-[90px] leading-relaxed"
            placeholder="Ne tarz bir video istersiniz? Örneğin: Aydınlık bir mutfakta sabah kahvesi..."
          />
          
          <button 
            type="button"
            onClick={handleSuggestPrompt}
            disabled={suggestionLoading}
            className="absolute bottom-4 right-4 bg-[#1f1a2e] hover:bg-[#2a243d] border border border-[#342a4d] px-4 py-2 rounded-xl text-white text-[13px] font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {suggestionLoading ? (
               <div className="w-4 h-4 border-2 border-[#7f0df2]/30 border-t-[#7f0df2] rounded-full animate-spin"></div>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e4e4e9]"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                Öneri AI
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2.5 mb-10 w-full overflow-x-auto scrollbar-hide py-1">
        {tags.map(t => (
          <button key={t} className="bg-[#151221] border border-[#261f3d] rounded-full px-4 py-2 text-[#a19daf] text-[13px] font-medium whitespace-nowrap hover:border-[#7f0df2]/50 hover:text-white transition-colors">
            {t}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <button 
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-[18px] rounded-2xl bg-[#7f0df2] text-white font-bold text-[16px] shadow-[0_8px_25px_-5px_rgba(127,13,242,0.5)] active:scale-[0.98] transition-all flex justify-center items-center gap-3 relative z-10"
      >
        {loading ? (
          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            İçerik Üret
          </>
        )}
      </button>

    </div>
  );
}
