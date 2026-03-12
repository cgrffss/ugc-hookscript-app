'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Fallback direct bypass for local testing
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real flow, use supabase.auth.signInWithPassword
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(`Giriş başarısız: ${error.message}`);
        console.warn("Supabase auth error, bypassing for template flow:", error.message);
      } else {
        toast.success("Başarıyla giriş yapıldı!");
      }
      // Regardless of error, push to dashboard for MVP testing because no users are registered
      router.push('/dashboard');
      
    } catch (err) {
      console.error(err);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'apple') => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) {
        toast.error(`OAuth hatası: ${error.message}`);
        console.error("OAuth error:", error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Giriş başlatılırken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 pt-12 pb-8 relative">
      
      {/* Header back button (mock) */}
      <div className="w-full flex items-center justify-between mb-8">
        <button className="text-white hover:bg-white/10 p-2 rounded-full transition-colors" onClick={() => router.back()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h1 className="text-lg font-bold text-white tracking-wide">Giriş Yap</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* The glowing circle header area */}
      <div className="w-full max-w-sm aspect-[1.8/1] bg-[#08060c] rounded-[32px] border border-[#1f1a2e] flex items-center justify-center relative shadow-[0_20px_60px_-15px_rgba(12,223,205,0.15)] mb-10 overflow-hidden">
        {/* Glow behind the circle */}
        <div className="absolute w-[180px] h-[180px] bg-[#0cdfcd]/30 blur-[40px] rounded-full"></div>
        
        {/* The neon circles */}
        <div className="relative w-32 h-32 rounded-full border-[3px] border-[#0cdfcd] shadow-[0_0_20px_#0cdfcd,inset_0_0_20px_#0cdfcd] flex items-center justify-center">
          <div className="w-28 h-28 rounded-full border-[2px] border-[#0cdfcd]/60 -ml-2 mb-1"></div>
          <div className="absolute w-26 h-26 rounded-full border border-[#0cdfcd]/40 ml-2 mt-2"></div>
        </div>
      </div>

      <div className="w-full text-center mb-8">
        <h2 className="text-[28px] font-bold text-white mb-2">Giriş Yap</h2>
        <p className="text-[#a19daf] text-[15px]">UGC dünyasına adım atın</p>
      </div>

      <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
        
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-[#e4e4e9] px-1">E-posta</label>
          <div className="w-full bg-[#151221] border border-[#261f3d] rounded-2xl overflow-hidden focus-within:border-[#7f0df2] transition-colors">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent px-5 py-4 text-white text-[15px] focus:outline-none"
              placeholder="E-posta adresinizi girin"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mt-2">
          <label className="text-[13px] font-medium text-[#e4e4e9] px-1">Şifre</label>
          <div className="w-full bg-[#151221] border border-[#261f3d] rounded-2xl overflow-hidden focus-within:border-[#7f0df2] transition-colors">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent px-5 py-4 text-white text-[15px] focus:outline-none"
              placeholder="Şifrenizi girin"
              required
            />
          </div>
        </div>

        <div className="w-full flex justify-end mt-1 mb-2">
          <button type="button" className="text-[#7f0df2] text-[13px] font-semibold hover:text-[#9b39fc] transition-colors">
            Şifremi Unuttum
          </button>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-[18px] rounded-2xl bg-[#7f0df2] text-white font-bold text-[16px] shadow-[0_8px_25px_-5px_rgba(127,13,242,0.5)] active:scale-[0.98] transition-all flex justify-center items-center"
        >
          {loading ? (
             <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            'Giriş Yap'
          )}
        </button>
      </form>
      
      {/* OAuth Separator */}
      <div className="w-full relative flex items-center justify-center my-8">
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#261f3d] to-transparent"></div>
        <span className="bg-[#0d0b14] px-4 text-[12px] text-[#6d687c] font-medium relative z-10">veya şununla devam et</span>
      </div>

      <div className="w-full grid grid-cols-2 gap-4 mb-8">
        <button 
          type="button" 
          onClick={() => handleOAuthLogin('google')}
          className="w-full py-[14px] rounded-2xl bg-transparent border border-[#261f3d] text-white font-medium text-[14px] flex items-center justify-center gap-3 hover:bg-[#151221] transition-colors active:scale-95"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/></g></svg>
          Google
        </button>
        <button 
          type="button" 
          onClick={() => handleOAuthLogin('apple')}
          className="w-full py-[14px] rounded-2xl bg-transparent border border-[#261f3d] text-white font-medium text-[14px] flex items-center justify-center gap-3 hover:bg-[#151221] transition-colors active:scale-95"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M16.365 1.587c-1.282.046-2.812.866-3.69 1.849-.787.892-1.428 2.302-1.127 3.551 1.433.109 2.807-.751 3.655-1.724.845-.964 1.486-2.457 1.162-3.676zM21.288 16.944c-.615 1.766-2.186 4.793-4.104 4.814-1.144.01-1.579-.691-3.415-.691-1.85 0-2.316.67-3.444.701-1.884.053-3.654-3.13-4.303-4.991C4.469 12.35 4.965 7.427 7.747 5.86c1.236-.693 2.646-.723 3.665-.723 1.258 0 2.452.88 3.19.88.75 0 2.215-1.07 3.753-1.07.69 0 2.583.056 3.765 1.748-3.076 1.83-2.584 6.273.475 7.491-.32 1.056-1.115 2.193-1.307 2.758z"/></svg>
          Apple
        </button>
      </div>

      <div className="mt-auto w-full text-center">
        <p className="text-[#a19daf] text-[14px]">
          Hesabınız yok mu? <button onClick={() => toast.info('Kayıt olma özelliği yakında aktif olacak!')} className="text-[#7f0df2] font-semibold">Kaydolun</button>
        </p>
      </div>

    </div>
  );
}
