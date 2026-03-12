'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, PlusCircle, BarChart2, User } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const pathname = usePathname();

  // Hide nav on login, register, and sometimes pricing
  if (['/login', '/register'].includes(pathname)) return null;

  const tabs = [
    { label: 'Ana Sayfa', href: '/', icon: Home },
    { label: 'Keşfet', href: '/explore', icon: Compass },
    { label: 'Üret', href: '/dashboard', icon: PlusCircle, isPrimary: true },
    { label: 'Analiz', href: '/analytics', icon: BarChart2 },
    { label: 'Profil', href: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center w-full pointer-events-none">
      <div className="w-full max-w-md bg-[#0f0c1a]/95 backdrop-blur-xl border-t border-white/5 px-2 pb-5 pt-3 pointer-events-auto shadow-[0_-10px_40px_-15px_rgba(127,13,242,0.2)]">
        <ul className="flex items-center justify-between w-full relative">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href || (tab.href === '/dashboard' && pathname === '/result');
            const Icon = tab.icon;

            if (tab.isPrimary) {
              return (
                <li key={tab.label} className="flex-1 flex justify-center -translate-y-6">
                  <Link href={tab.href} className="flex flex-col items-center gap-1 group">
                    <div className={clsx(
                      "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform group-active:scale-95",
                      isActive 
                        ? "bg-[#7f0df2] shadow-[0_0_20px_#7f0df2]" 
                        : "bg-[#251b3a] border border-[#7f0df2]/50 group-hover:bg-[#34244f]"
                    )}>
                      <Icon className={clsx("w-6 h-6", isActive ? "text-white" : "text-[#7f0df2]")} strokeWidth={2.5} />
                    </div>
                    <span className={clsx(
                      "text-[10px] font-medium tracking-wide mt-1",
                      isActive ? "text-[#7f0df2]" : "text-gray-400 group-hover:text-gray-300"
                    )}>
                      {tab.label}
                    </span>
                  </Link>
                </li>
              );
            }

            return (
              <li key={tab.label} className="flex-1 flex justify-center relative">
                <Link href={tab.href} className="flex flex-col items-center gap-1.5 w-full py-1">
                  <div className="relative">
                    <Icon 
                      className={clsx(
                        "w-5 h-5 transition-colors",
                        isActive ? "text-white" : "text-gray-500"
                      )} 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {isActive && (
                      <motion.div 
                        layoutId="nav-indicator"
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                  </div>
                  <span className={clsx(
                    "text-[10px] uppercase font-semibold tracking-wider transition-colors",
                    isActive ? "text-white" : "text-gray-500"
                  )}>
                    {tab.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
