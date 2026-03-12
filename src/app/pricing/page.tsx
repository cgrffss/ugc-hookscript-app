'use client';

import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col px-5 pt-12 pb-32 items-center">
      
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between mb-8">
        <button className="text-white hover:bg-white/10 p-2 -ml-2 rounded-full transition-colors" onClick={() => router.back()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        <span className="text-[14px] font-bold text-white tracking-widest uppercase">PREMİUM</span>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* Header Info */}
      <div className="w-full text-center mb-10">
        <h1 className="text-[32px] font-bold text-white mb-4 leading-tight tracking-tight">
          Premium&apos;un Gücünü<br />Keşfedin
        </h1>
        <p className="text-[#a19daf] text-[14px] px-2 leading-relaxed">
          Yaratıcılığınızı bir üst seviyeye taşıyın<br />ve içeriklerinizi parlatın.
        </p>
      </div>

      <div className="w-full max-w-[340px] flex flex-col gap-6 relative">
        
        {/* Card 1: Başlangıç */}
        <div className="w-full bg-[#151221] rounded-[24px] p-6 border border-[#261f3d] relative">
          <h3 className="text-[#7f0df2] text-[11px] font-bold tracking-widest uppercase mb-4">BAŞLANGIÇ</h3>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-white text-4xl font-bold">₺0</span>
            <span className="text-[#a19daf] text-[13px] font-medium pb-1">/aylık</span>
          </div>
          <p className="text-[#88839a] text-[12px] mb-6">Temel özelliklerle hemen keşfetmeye başla.</p>
          
          <button className="w-full py-[14px] rounded-xl bg-[#1c172b] text-white font-bold text-[14px] hover:bg-[#251e38] transition-colors mb-6">
            Ücretsiz Başla
          </button>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2 text-[#e4e4e9] text-[13px]">
              <div className="w-4 h-4 rounded-full bg-[#7f0df2] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              Sınırlı UGC araçları
            </li>
            <li className="flex items-center gap-2 text-[#e4e4e9] text-[13px]">
              <div className="w-4 h-4 rounded-full bg-[#7f0df2] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              Standart dışa aktarma (720p)
            </li>
            <li className="flex items-center gap-2 text-[#e4e4e9] text-[13px]">
              <div className="w-4 h-4 rounded-full bg-[#7f0df2] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              1 aktif proje
            </li>
          </ul>
        </div>

        {/* Card 2: PRO (Most Popular) */}
        <div className="w-full bg-[#200843] rounded-[24px] p-6 border-2 border-[#7f0df2] relative shadow-[0_10px_40px_-10px_rgba(127,13,242,0.4)]">
          
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#9b39fc] text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-[0_0_15px_#9b39fc]">
            EN POPÜLER
          </div>

          <h3 className="text-[#c892ff] text-[11px] font-bold tracking-widest uppercase mb-4 mt-2">PRO</h3>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-white text-5xl font-bold">₺199</span>
            <span className="text-[#a19daf] text-[13px] font-medium pb-1.5">/aylık</span>
          </div>
          <p className="text-[#a19daf] text-[12px] mb-6">Profesyonel içerik üreticileri için tasarlandı.</p>
          
          <button className="w-full py-[14px] rounded-xl bg-gradient-to-r from-[#8a2be2] to-[#7f0df2] text-white font-bold text-[15px] shadow-[0_5px_20px_rgba(127,13,242,0.5)] hover:from-[#9b39fc] hover:to-[#8a2be2] transition-colors mb-6 active:scale-95">
            Hemen Yükselt
          </button>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2 text-white text-[13px]">
              <div className="w-4 h-4 rounded-full bg-[#9b39fc] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              Tüm Pro araçları & filtreler
            </li>
            <li className="flex items-center gap-2 text-white text-[13px]">
              <div className="w-4 h-4 rounded-full bg-[#9b39fc] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              4K Yüksek kaliteli çıktı
            </li>
            <li className="flex items-center gap-2 text-white text-[13px]">
              <div className="w-4 h-4 rounded-full bg-[#9b39fc] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              Sınırsız proje depolama
            </li>
            <li className="flex items-center gap-2 text-white text-[13px]">
              <div className="w-4 h-4 rounded-full bg-[#9b39fc] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              Yapay zeka asistanı
            </li>
          </ul>
        </div>

        {/* Card 3: Stüdyo */}
        <div className="w-full bg-[#151221] rounded-[24px] p-6 border border-[#261f3d] relative">
          <h3 className="text-[#7f0df2] text-[11px] font-bold tracking-widest uppercase mb-4">STÜDYO</h3>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-white text-4xl font-bold">₺499</span>
            <span className="text-[#a19daf] text-[13px] font-medium pb-1">/aylık</span>
          </div>
          <p className="text-[#88839a] text-[12px] mb-6">Ekipler ve ajanslar için tam yetki.</p>
          
          <button className="w-full py-[14px] rounded-xl bg-[#1c172b] text-white font-bold text-[14px] hover:bg-[#251e38] transition-colors mb-6">
            Ekibini Kur
          </button>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2 text-[#e4e4e9] text-[13px]">
              <div className="w-4 h-4 rounded-full bg-[#7f0df2] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              Tüm Pro özellikleri dahil
            </li>
            <li className="flex items-center gap-2 text-[#e4e4e9] text-[13px]">
              <div className="w-4 h-4 rounded-full bg-[#7f0df2] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              Gerçek zamanlı ekip işbirliği
            </li>
            <li className="flex items-center gap-2 text-[#e4e4e9] text-[13px]">
              <div className="w-4 h-4 rounded-full bg-[#7f0df2] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              Öncelikli 7/24 destek
            </li>
            <li className="flex items-center gap-2 text-[#e4e4e9] text-[13px]">
              <div className="w-4 h-4 rounded-full bg-[#7f0df2] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              Marka kitleri & logolar
            </li>
          </ul>
        </div>
      </div>

      {/* Why Premium Section */}
      <div className="w-full mt-12">
        <h4 className="text-center text-[#7f0df2] text-[11px] font-bold tracking-widest uppercase mb-6">Neden Premium?</h4>
        <div className="grid grid-cols-2 gap-y-6 gap-x-4 px-4">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#1c1236] flex items-center justify-center text-[#9b39fc] shadow-[0_0_15px_rgba(127,13,242,0.2)]">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <span className="text-[10px] text-white font-bold uppercase tracking-wider">Hızlı İşleme</span>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#1c1236] flex items-center justify-center text-[#9b39fc] shadow-[0_0_15px_rgba(127,13,242,0.2)]">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m14.14 7.21-1.07-5.36L5.36 9.54l5.36 1.07 1.07 5.36 7.71-7.71-5.36-1.05z"/><path d="m21.21 21.21-3.53-3.53"/></svg>
            </div>
            <span className="text-[10px] text-white font-bold uppercase tracking-wider">AI Editör</span>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#1c1236] flex items-center justify-center text-[#9b39fc] shadow-[0_0_15px_rgba(127,13,242,0.2)]">
               <span className="font-extrabold text-[15px]">4K</span>
            </div>
            <span className="text-[10px] text-white font-bold uppercase tracking-wider">4K Kalite</span>
          </div>

          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#1c1236] flex items-center justify-center text-[#9b39fc] shadow-[0_0_15px_rgba(127,13,242,0.2)]">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 16v-4.5a3.5 3.5 0 0 0-7 0V16"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            </div>
            <span className="text-[10px] text-white font-bold uppercase tracking-wider">Bulut Yedek</span>
          </div>
        </div>
      </div>

    </div>
  );
}
