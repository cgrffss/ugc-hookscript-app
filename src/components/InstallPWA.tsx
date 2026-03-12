'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If it's already installed or running as standalone, don't show prompt
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstall(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstall(false);
      }
      // We no longer need the prompt. Clear it up
      setDeferredPrompt(null);
    }
  };

  return (
    <AnimatePresence>
      {showInstall && (
        <motion.div
           initial={{ y: 100, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           exit={{ y: 100, opacity: 0 }}
           transition={{ type: "spring", stiffness: 300, damping: 20 }}
           className="fixed bottom-28 left-4 right-4 z-[100]"
        >
          <div className="w-full bg-gradient-to-r from-[#7f0df2] to-[#c892ff] rounded-[16px] p-4 shadow-[0_10px_30px_rgba(127,13,242,0.4)] flex items-center gap-3">
             <div className="w-12 h-12 rounded-full bg-black/20 flex flex-col items-center justify-center shrink-0">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
             </div>
             <div className="flex-1">
                <h4 className="text-white font-bold text-[14px]">Uygulamayı İndir</h4>
                <p className="text-white/80 text-[12px] leading-snug">Deneyimi ana ekinize taşıyıp hızlanın</p>
             </div>
             <div className="flex gap-2">
               <button onClick={() => setShowInstall(false)} className="px-2 py-1.5 text-white/70 text-[12px] font-medium hover:text-white">Geç</button>
               <button onClick={handleInstallClick} className="bg-white text-[#7f0df2] px-4 py-1.5 rounded-full text-[13px] font-bold shadow-md hover:scale-105 transition-transform">İndir</button>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
