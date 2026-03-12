import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "../components/BottomNav";
import PushNotification from "../components/PushNotification";
import InstallPWA from "../components/InstallPWA";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HookScript AI - UGC Content Creator",
  description: "Generate viral UGC videos using AI instantly",
  manifest: "/manifest.json",
  themeColor: "#0d0b14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {/* Mobile App Container */}
        <div className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-[#0d0b14] overflow-hidden pb-20">
          <Toaster position="top-center" richColors expand={true} />
          <PushNotification />
          <InstallPWA />
          {children}
          <BottomNav />
        </div>
        
        {/* Service Worker Setup */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function (registration) {
                      console.log('Service Worker registration successful');
                    },
                    function (err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
