import React from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="w-full min-h-[95vh] flex flex-col px-5 pt-12 pb-32 bg-background relative overflow-y-auto">
      
      {/* Background glowing effects */}
      <div className="absolute top-0 right-[-20%] w-[300px] h-[300px] rounded-full bg-[#7f0df2]/10 blur-[100px] pointer-events-none" />

      {/* Header Info */}
      <div className="mb-8 z-10 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7f0df2] to-[#c892ff] flex items-center justify-center text-white text-xl font-bold border-2 border-[#151221]">
          C
        </div>
        <div>
           <h1 className="text-[24px] font-extrabold text-white leading-tight tracking-tight">
             Profil
           </h1>
           <p className="text-[#0cdfcd] text-[14px] font-medium">Free Plan</p>
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
              <button className="flex-1 py-3 rounded-xl border border-dashed border-[#504a62] text-[#a19daf] text-[13px] font-medium flex flex-col items-center justify-center gap-2 hover:border-[#7f0df2] hover:text-white transition-colors bg-[#110e1b]">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                 Logo Yükle
              </button>
              <button className="flex-1 py-3 rounded-xl border border-[#261f3d] text-[#e4e4e9] text-[13px] font-medium flex flex-col items-center justify-center gap-2 hover:bg-[#1a152e] transition-colors bg-[#110e1b]">
                 <div className="flex gap-1">
                    <div className="w-4 h-4 rounded-full bg-white border border-[#261f3d]" />
                    <div className="w-4 h-4 rounded-full bg-black border border-[#261f3d] -ml-2" />
                 </div>
                 Renk Seçimi
              </button>
            </div>
         </div>

         {/* Ayarlar */}
         <div className="w-full bg-[#151221] p-5 rounded-[20px] border border-[#261f3d] flex flex-col gap-4">
            <button className="flex items-center justify-between group">
               <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a19daf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-white transition-colors"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                  <span className="text-[#e4e4e9] font-medium text-[15px] group-hover:text-white transition-colors">Ayarlar</span>
               </div>
            </button>
            <div className="h-px w-full bg-[#261f3d]" />
            <Link href="/" className="flex items-center justify-between group">
               <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                  <span className="text-[#ef4444] font-medium text-[15px]">Çıkış Yap</span>
               </div>
            </Link>
         </div>
      </div>
      
    </div>
  );
}
