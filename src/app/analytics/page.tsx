'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    generationCount: 0,
    credits: 0,
    loading: true
  });

  useEffect(() => {
    async function fetchStats() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;

      const [genRes, profileRes] = await Promise.all([
        supabase
          .from('generations')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userData.user.id),
        supabase
          .from('profiles')
          .select('credits')
          .eq('id', userData.user.id)
          .single()
      ]);

      setStats({
        generationCount: genRes.count || 0,
        credits: profileRes.data?.credits || 0,
        loading: false
      });
    }

    fetchStats();
  }, []);

  if (stats.loading) {
     return <div className="w-full min-h-screen flex items-center justify-center text-white">Yükleniyor...</div>;
  }

  const estimatedReach = stats.generationCount * 36.8; // Mock multiplier for demo (36.8K per video)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-[95vh] flex flex-col px-5 pt-12 pb-32 bg-background relative overflow-y-auto"
    >
      {/* Background glowing effects */}
       <div className="absolute top-[-10%] right-[-20%] w-[250px] h-[250px] rounded-full bg-[#0cdfcd]/15 blur-[100px] pointer-events-none" />
       <div className="absolute top-[30%] left-[-20%] w-[250px] h-[250px] rounded-full bg-[#7f0df2]/10 blur-[100px] pointer-events-none" />

      {/* Header Info */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 z-10 flex justify-between items-end"
      >
        <div>
          <h1 className="text-[32px] font-extrabold text-white leading-tight mb-1 tracking-tight">Kredi Getirisi</h1>
          <p className="text-[#a19daf] text-[15px]">Bu ay içerikleriniz ne kadar etkili oldu?</p>
        </div>
      </motion.div>

      {/* Main ROI Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="z-10 w-full bg-gradient-to-tr from-[#151221] to-[#1a152e] p-6 rounded-[24px] border border-[#261f3d] mb-6 shadow-[0_10px_40px_-10px_rgba(12,223,205,0.1)] relative overflow-hidden"
      >
         {/* Decorative Grid */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
         
         <div className="relative z-10">
           <h3 className="text-[#a19daf] text-[13px] uppercase tracking-wider font-semibold mb-2">Tahmini Gösterim Katkısı</h3>
           <div className="flex items-center gap-3 mb-2">
              <span className="text-[42px] font-black text-white tracking-tighter">{Math.floor(estimatedReach)}</span>
              <span className="text-[20px] font-bold text-[#0cdfcd] mt-2 tracking-tight">Bin</span>
           </div>
           
           <div className="w-full bg-[#110e1b] h-3 rounded-full mt-4 mb-2 overflow-hidden border border-[#261f3d]">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(stats.generationCount * 10, 100)}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#7f0df2] to-[#0cdfcd] rounded-full relative"
              >
                 <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </motion.div>
           </div>
           
           <p className="text-[#a19daf] text-[13px] mt-3">
             <strong className="text-white">🚀 Sadece {stats.generationCount} video kredi harcayarak</strong> ortalama {Math.floor(estimatedReach)}K organik gösterim potansiyeline ulaştınız.
           </p>
         </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.4 }
          }
        }}
        className="z-10 grid grid-cols-2 gap-4 w-full"
      >
         <motion.div 
           variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
           className="bg-[#151221] p-4 rounded-[20px] border border-[#261f3d]"
         >
            <div className="w-8 h-8 rounded-full bg-[#7f0df2]/20 text-[#c892ff] flex items-center justify-center mb-3">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <p className="text-[#a19daf] text-[12px] font-medium mb-1">Üretilen Video</p>
            <p className="text-white text-[24px] font-bold">{stats.generationCount}</p>
         </motion.div>
         
         <motion.div 
           variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
           className="bg-[#151221] p-4 rounded-[20px] border border-[#261f3d]"
         >
            <div className="w-8 h-8 rounded-full bg-[#0cdfcd]/20 text-[#0cdfcd] flex items-center justify-center mb-3">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <p className="text-[#a19daf] text-[12px] font-medium mb-1">Kalan Kredi</p>
            <p className="text-white text-[24px] font-bold">{stats.credits}</p>
         </motion.div>
      </motion.div>
      
      {/* Upgrade CTA */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="z-10 mt-8"
      >
        <Link href="/pricing" className="w-full bg-gradient-to-r from-[#7f0df2]/20 to-[#0cdfcd]/20 p-5 rounded-[24px] border border-[#7f0df2]/30 flex items-center justify-between hover:border-[#7f0df2]/60 transition-colors shadow-[0_0_20px_rgba(127,13,242,0.1)] group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7f0df2] flex items-center justify-center shadow-[0_0_15px_rgba(127,13,242,0.5)]">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <div>
              <span className="text-white font-bold text-[16px] block">Premium&apos;a Geç</span>
              <span className="text-[#a19daf] text-[12px]">Daha fazla kredi ve 4K video üretimi</span>
            </div>
          </div>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </motion.div>
        </Link>
      </motion.div>
      
    </motion.div>
  );
}
