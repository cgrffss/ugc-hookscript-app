'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [generations, setGenerations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenerations() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) {
        setLoading(false);
        return;
      }
      
      const { data } = await supabase
        .from('generations')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false });
        
      if (data) setGenerations(data);
      setLoading(false);
    }
    
    fetchGenerations();
  }, []);

  if (loading) {
     return <div className="w-full min-h-screen flex text-center justify-center pt-32 text-white">Yükleniyor...</div>
  }

  // EMPTY STATE
  if (generations.length === 0) {
    return (
      <div className="w-full min-h-[95vh] flex flex-col items-center justify-center px-6 relative bg-background pb-20 overflow-hidden">
        <div className="absolute top-[20%] right-[-20%] w-[300px] h-[300px] rounded-full bg-[#7f0df2]/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-20%] w-[300px] h-[300px] rounded-full bg-[#0cdfcd]/10 blur-[100px] pointer-events-none" />
        
        <div className="w-24 h-24 mb-6 rounded-full bg-[#151221] border border-[#261f3d] flex items-center justify-center shadow-[0_0_40px_rgba(127,13,242,0.1)] relative z-10">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#504a62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        </div>

        <h2 className="text-[24px] font-extrabold text-white mb-3 text-center tracking-tight relative z-10">
          Henüz bir içerik<br/>üretmediniz.
        </h2>
        <p className="text-[#a19daf] text-[15px] mb-8 text-center max-w-[280px] leading-relaxed relative z-10">
          İlk viral kancanızı oluşturmak için hemen bir ürün/konu girin.
        </p>

        <Link href="/dashboard" className="py-4 px-8 rounded-2xl bg-[#7f0df2] text-white font-bold text-[16px] shadow-[0_8px_25px_-5px_rgba(127,13,242,0.5)] active:scale-95 transition-all flex items-center gap-2 relative z-10">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
           İlk İçeriği Üret
        </Link>
      </div>
    );
  }

  // BENTO GRID HISTORY
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-[95vh] flex flex-col px-5 pt-12 pb-32 bg-background relative overflow-y-auto"
    >
      <div className="absolute top-[-10%] right-[-10%] w-[250px] h-[250px] rounded-full bg-[#7f0df2]/10 blur-[100px] pointer-events-none" />

      <div className="mb-8 z-10 flex justify-between items-end">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-[30px] font-extrabold text-white leading-tight tracking-tight">Ana Sayfa</h1>
          <p className="text-[#a19daf] text-[14px] mt-1">Son ürettiğiniz içerikler</p>
        </motion.div>
      </div>

      <motion.div 
        className="grid grid-cols-2 gap-3 z-10"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
          {generations.map((gen, i) => (
            <motion.div
              key={gen.id || i}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: { opacity: 1, scale: 1 }
              }}
            >
              <Link href={`/result?id=${gen.id}`} className="block">
                <div className="bg-[#151221] p-3 rounded-[20px] border border-[#261f3d] flex flex-col relative overflow-hidden group hover:border-[#7f0df2]/50 transition-colors">
                  <div className="w-full aspect-[4/5] bg-[#110e1b] rounded-[14px] mb-3 relative overflow-hidden border border-white/5">
                      {gen.thumbnail_url || gen.input_image ? (
                          <img src={gen.thumbnail_url || gen.input_image} alt="Video Thumbnail" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#261f3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          </div>
                      )}
                      {gen.status === 'processing' && (
                          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-full border border-white/10 flex items-center gap-1.5 shadow-lg">
                            <div className="w-1.5 h-1.5 bg-[#7f0df2] rounded-full animate-pulse" />
                            Hazırlanıyor
                          </div>
                      )}
                      {gen.status === 'completed' && (
                          <div className="absolute top-2 right-2 bg-[#0cdfcd]/20 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-full border border-[#0cdfcd]/30 flex items-center gap-1.5 shadow-lg">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0cdfcd" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            Hazır
                          </div>
                      )}
                  </div>
                  <h3 className="text-white font-bold text-[14px] truncate mb-1 group-hover:text-[#7f0df2] transition-colors">{gen.product_name}</h3>
                  <p className="text-[#504a62] text-[11px] truncate">{new Date(gen.created_at).toLocaleDateString()}</p>
                </div>
              </Link>
            </motion.div>
          ))}
      </motion.div>
    </motion.div>
  );
}
