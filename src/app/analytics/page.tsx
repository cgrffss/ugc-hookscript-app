import React from 'react';

export default function AnalyticsPage() {
  return (
    <div className="w-full min-h-[95vh] flex flex-col px-5 pt-12 pb-32 bg-background relative overflow-y-auto">
      {/* Background glowing effects */}
       <div className="absolute top-[-10%] right-[-20%] w-[250px] h-[250px] rounded-full bg-[#0cdfcd]/15 blur-[100px] pointer-events-none" />
       <div className="absolute top-[30%] left-[-20%] w-[250px] h-[250px] rounded-full bg-[#7f0df2]/10 blur-[100px] pointer-events-none" />

      {/* Header Info */}
      <div className="mb-6 z-10 flex justify-between items-end">
        <div>
          <h1 className="text-[32px] font-extrabold text-white leading-tight mb-1 tracking-tight">Kredi Getirisi</h1>
          <p className="text-[#a19daf] text-[15px]">Bu ay içerikleriniz ne kadar etkili oldu?</p>
        </div>
      </div>

      {/* Main ROI Card */}
      <div className="z-10 w-full bg-gradient-to-tr from-[#151221] to-[#1a152e] p-6 rounded-[24px] border border-[#261f3d] mb-6 shadow-[0_10px_40px_-10px_rgba(12,223,205,0.1)] relative overflow-hidden">
         {/* Decorative Grid */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
         
         <div className="relative z-10">
           <h3 className="text-[#a19daf] text-[13px] uppercase tracking-wider font-semibold mb-2">Tahmini Gösterim Katkısı</h3>
           <div className="flex items-center gap-3 mb-2">
              <span className="text-[42px] font-black text-white tracking-tighter">184</span>
              <span className="text-[20px] font-bold text-[#0cdfcd] mt-2 tracking-tight">Bin</span>
           </div>
           
           <div className="w-full bg-[#110e1b] h-3 rounded-full mt-4 mb-2 overflow-hidden border border-[#261f3d]">
              <div className="h-full bg-gradient-to-r from-[#7f0df2] to-[#0cdfcd] w-[75%] rounded-full relative">
                 <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
           </div>
           
           <p className="text-[#a19daf] text-[13px] mt-3">
             <strong className="text-white">🚀 Sadece 5 video kredi harcayarak</strong> ortalama 184K organik gösterim potansiyeline ulaştınız.
           </p>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="z-10 grid grid-cols-2 gap-4 w-full">
         <div className="bg-[#151221] p-4 rounded-[20px] border border-[#261f3d]">
            <div className="w-8 h-8 rounded-full bg-[#7f0df2]/20 text-[#c892ff] flex items-center justify-center mb-3">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <p className="text-[#a19daf] text-[12px] font-medium mb-1">Üretilen Video</p>
            <p className="text-white text-[24px] font-bold">5</p>
         </div>
         
         <div className="bg-[#151221] p-4 rounded-[20px] border border-[#261f3d]">
            <div className="w-8 h-8 rounded-full bg-[#0cdfcd]/20 text-[#0cdfcd] flex items-center justify-center mb-3">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <p className="text-[#a19daf] text-[12px] font-medium mb-1">Harcanan Bütçe</p>
            <p className="text-white text-[24px] font-bold">15 Kredi</p>
         </div>
      </div>
      
    </div>
  );
}
