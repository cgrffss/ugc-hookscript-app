'use client';

import { useRouter } from 'next/navigation';

export default function ResultPage() {
  const router = useRouter();

  // Mock Data
  const resultImageUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000"; // Ideally this is the returning video/image url from N8n

  return (
    <div className="w-full flex flex-col px-5 pt-12 pb-24 items-center">
      
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between mb-8">
        <button className="text-white hover:bg-white/10 p-2 -ml-2 rounded-full transition-colors" onClick={() => router.push('/dashboard')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <span className="text-[17px] font-bold text-white tracking-wide">Sonuç</span>
        <button className="text-[#a19daf] hover:text-white p-2 -mr-2 rounded-full transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6m0-6-6 6"/><path d="m19 19-2-2m2 0-2-2m2 2h-4"/></svg> {/* Magic wand abstract */}
        </button>
      </div>

      {/* Header Info */}
      <div className="w-full flex flex-col items-center text-center mb-8 mt-2">
        <div className="w-16 h-16 rounded-full bg-[#1c1236] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(127,13,242,0.3)]">
           <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7f0df2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 14 3-3-3-3"/><path d="M14 11h7"/><path d="m10.5 7.5-3.5 3.5 3.5 3.5"/><path d="M6 11H3"/></svg>
        </div>
        <h1 className="text-[28px] font-bold text-white mb-2 tracking-tight">
          Harika! İçeriğin Hazır
        </h1>
        <p className="text-[#a19daf] text-[15px]">
          Yapay zeka görselini başarıyla oluşturdu.
        </p>
      </div>

      {/* The Resulting Output Container */}
      <div className="w-full max-w-[340px] aspect-[4/5] bg-[#151221] rounded-[24px] overflow-hidden border border-[#261f3d] relative mb-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
        
        {/* The Image / Video */}
        <img 
          src={resultImageUrl} 
          alt="Generated Result" 
          className="w-full h-full object-cover"
        />

        {/* Bottom Inner Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
          
          <div className="w-full bg-[#151221]/80 backdrop-blur-md rounded-xl border border-white/10 p-3 flex items-center justify-between shadow-lg">
            <div className="flex flex-col">
              <span className="text-[#7f0df2] text-[10px] font-bold uppercase tracking-widest mb-0.5">Premium Render</span>
              <span className="text-white text-[13px] font-medium truncate w-[180px]">UGC_Headphones_Final.png</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#7f0df2] flex items-center justify-center text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
          </div>

        </div>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-[340px] flex flex-col gap-3 mb-6">
        <button className="w-full py-[16px] rounded-2xl bg-[#7f0df2] text-white font-bold text-[16px] shadow-[0_8px_25px_-5px_rgba(127,13,242,0.5)] active:scale-[0.98] transition-all flex justify-center items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          İndir
        </button>

        <div className="w-full grid grid-cols-2 gap-3">
          <button className="w-full py-[14px] rounded-2xl bg-[#151221] border border-[#261f3d] text-white font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-[#1a1629] transition-colors active:scale-95">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7f0df2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
            Paylaş
          </button>
          
          <button className="w-full py-[14px] rounded-2xl bg-[#151221] border border-[#261f3d] text-white font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-[#1a1629] transition-colors active:scale-95">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7f0df2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
            Düzenle
          </button>
        </div>
      </div>

      <button onClick={() => router.push('/dashboard')} className="text-[#a19daf] text-[14px] font-medium flex items-center justify-center gap-2 hover:text-white transition-colors py-2 active:scale-95">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
        Yeniden Oluştur
      </button>

    </div>
  );
}
