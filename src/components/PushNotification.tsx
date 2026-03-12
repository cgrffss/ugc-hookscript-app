'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PushNotification() {
  const [isVisible, setIsVisible] = useState(false);

  // For demonstration, show a notification 3 seconds after the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
           initial={{ y: -100, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           exit={{ y: -100, opacity: 0 }}
           transition={{ type: "spring", stiffness: 300, damping: 20 }}
           className="fixed top-6 left-4 right-4 z-[100]"
        >
          <div className="w-full max-w-sm mx-auto bg-[#1a152e]/95 backdrop-blur-xl rounded-[20px] p-4 border border-[#7f0df2]/50 shadow-[0_15px_40px_-10px_rgba(127,13,242,0.4)] flex items-start gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7f0df2] to-[#c892ff] flex items-center justify-center shrink-0 shadow-lg">
                <span className="text-white text-lg">✨</span>
             </div>
             <div className="flex-1 pt-0.5">
                <h4 className="text-white font-bold text-[15px] mb-0.5 tracking-tight">Videonuz Hazır!</h4>
                <p className="text-[#a19daf] text-[13px] leading-snug pr-4">"High-end Headphones" şablonlu kurgu videonuz oluşturuldu ve N8N üzerinden paylaşıldı.</p>
             </div>
             <button onClick={() => setIsVisible(false)} className="text-[#504a62] hover:text-white transition-colors p-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
             </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
