'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [generation, setGeneration] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGeneration() {
      if (!id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching generation:', error);
        toast.error('İçerik yüklenirken bir hata oluştu.');
      } else {
        setGeneration(data);
      }
      setLoading(false);
    }

    fetchGeneration();
  }, [id]);

  if (loading) {
    return <div className="w-full min-h-screen flex items-center justify-center text-white">Yükleniyor...</div>;
  }

  if (!generation) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center text-white p-5 text-center">
        <h1 className="text-2xl font-bold mb-4">İçerik Bulunamadı</h1>
        <button onClick={() => router.push('/')} className="text-[#a19daf] hover:text-white underline">
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  const displayImageUrl = generation.video_url || generation.input_image;

  return (
    <div className="w-full flex flex-col px-5 pt-12 pb-24 items-center">
      
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between mb-8">
        <button className="text-white hover:bg-white/10 p-2 -ml-2 rounded-full transition-colors" onClick={() => router.push('/')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <span className="text-[17px] font-bold text-white tracking-wide">Sonuç</span>
        <button className="text-[#a19daf] hover:text-white p-2 -mr-2 rounded-full transition-colors" onClick={() => toast.info('Sihirli düzenleme yakında!')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"/><path d="M12 18v4"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M4.93 19.07l1.41-1.41"/><path d="M17.66 6.34l1.41-1.41"/></svg>
        </button>
      </div>

      {/* Header Info */}
      <div className="w-full flex flex-col items-center text-center mb-8 mt-2">
        <div className="w-16 h-16 rounded-full bg-[#1c1236] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(127,13,242,0.3)]">
           <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7f0df2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 14 3-3-3-3"/><path d="M14 11h7"/><path d="m10.5 7.5-3.5 3.5 3.5 3.5"/><path d="M6 11H3"/></svg>
        </div>
        <h1 className="text-[28px] font-bold text-white mb-2 tracking-tight">
          {generation.status === 'completed' ? 'Harika! İçeriğin Hazır' : 'Ajanımız Çalışıyor...'}
        </h1>
        <p className="text-[#a19daf] text-[15px]">
          {generation.status === 'completed' 
            ? 'Yapay zeka içeriğini başarıyla oluşturdu.' 
            : 'Video hazırlanırken bu sayfayı takip edebilirsiniz.'}
        </p>
      </div>

      {/* The Resulting Output Container */}
      <div className="w-full max-w-[340px] aspect-[4/5] bg-[#151221] rounded-[24px] overflow-hidden border border-[#261f3d] relative mb-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
        
        {/* The Image / Video */}
        {generation.status === 'completed' && generation.video_url ? (
          <video 
            src={generation.video_url} 
            className="w-full h-full object-cover"
            controls
            autoPlay
            loop
          />
        ) : (
          <img 
            src={displayImageUrl} 
            alt="Generated Result" 
            className={`w-full h-full object-cover ${generation.status === 'processing' ? 'opacity-50 blur-[2px]' : ''}`}
          />
        )}

        {/* Status Overlay for Processing */}
        {generation.status === 'processing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <div className="w-12 h-12 border-4 border-[#7f0df2]/20 border-t-[#7f0df2] rounded-full animate-spin mb-4"></div>
            <span className="text-white font-bold bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">İşleniyor...</span>
          </div>
        )}

        {/* Bottom Inner Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4 pointer-events-none">
          
          <div className="w-full bg-[#151221]/80 backdrop-blur-md rounded-xl border border-white/10 p-3 flex items-center justify-between shadow-lg pointer-events-auto">
            <div className="flex flex-col">
              <span className="text-[#7f0df2] text-[10px] font-bold uppercase tracking-widest mb-0.5">
                {generation.status === 'completed' ? 'Premium Render' : 'Hazırlanıyor'}
              </span>
              <span className="text-white text-[13px] font-medium truncate w-[180px]">
                {generation.product_name}
              </span>
            </div>
            {generation.status === 'completed' && (
              <div className="w-6 h-6 rounded-full bg-[#7f0df2] flex items-center justify-center text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-[340px] flex flex-col gap-3 mb-6">
        <button 
          disabled={generation.status !== 'completed'}
          onClick={() => {
            if (generation.video_url) window.open(generation.video_url, '_blank');
          }}
          className="w-full py-[16px] rounded-2xl bg-[#7f0df2] text-white font-bold text-[16px] shadow-[0_8px_25px_-5px_rgba(127,13,242,0.5)] active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          İndir
        </button>

        <div className="w-full grid grid-cols-2 gap-3">
          <button 
            disabled={generation.status !== 'completed'}
            onClick={() => toast.info('Paylaşım özelliği çok yakında!')}
            className="w-full py-[14px] rounded-2xl bg-[#151221] border border-[#261f3d] text-white font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-[#1a1629] transition-colors active:scale-95 disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7f0df2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
            Paylaş
          </button>
          
          <button 
            onClick={() => toast.info('Düzenleme aracı yakında eklenecek!')}
            className="w-full py-[14px] rounded-2xl bg-[#151221] border border-[#261f3d] text-white font-medium text-[15px] flex items-center justify-center gap-2 hover:bg-[#1a1629] transition-colors active:scale-95"
          >
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

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen flex items-center justify-center text-white">Yükleniyor...</div>}>
      <ResultContent />
    </Suspense>
  );
}
