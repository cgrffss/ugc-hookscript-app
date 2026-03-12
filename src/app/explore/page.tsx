import React from 'react';
import BottomNav from '@/components/BottomNav'; // Assuming a reusable bottom nav exists

export default function ExplorePage() {
  const trends = [
    { title: "ASMR Paket Açılışı", uses: "14.2k", growth: "+45%" },
    { title: "POV: Sipariş Hazırlama", uses: "8.9k", growth: "+112%" },
    { title: "Sahte Müşteri Yorumu", uses: "22.1k", growth: "+12%" },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col px-5 pt-12 pb-32 bg-background relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-[-10%] left-[-20%] w-[300px] h-[300px] rounded-full bg-[#7f0df2]/10 blur-[100px] pointer-events-none" />

      {/* Header Info */}
      <div className="mb-8 z-10">
        <h1 className="text-[32px] font-extrabold text-white leading-tight mb-2 tracking-tight">
          Keşfet
        </h1>
        <p className="text-[#a19daf] text-[15px]">
          Bugün yükselişte olan e-ticaret video trendleri.
        </p>
      </div>

      <div className="z-10 flex flex-col gap-4 w-full">
        {trends.map((trend, i) => (
           <div key={i} className="w-full bg-[#151221] p-5 rounded-[20px] border border-[#261f3d] flex items-center justify-between hover:border-[#7f0df2]/50 transition-colors">
              <div>
                <h3 className="text-white font-bold text-[16px] mb-1">{trend.title}</h3>
                <p className="text-[#a19daf] text-[13px]">{trend.uses} üretim</p>
              </div>
              <div className="bg-[#0cdfcd]/10 text-[#0cdfcd] px-3 py-1 rounded-full text-[12px] font-bold">
                {trend.growth}
              </div>
           </div>
        ))}
        
        <button className="w-full mt-4 py-[16px] rounded-2xl bg-[#1a152e] text-[#a19daf] font-semibold border border-[#261f3d]">
          Daha fazla şablon gör
        </button>
      </div>
      
    </div>
  );
}
