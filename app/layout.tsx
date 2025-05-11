import type { Metadata } from 'next';
import { Press_Start_2P, Space_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const pixelFont = Press_Start_2P({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pixel',
});

const monoFont = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    template: '%s | 5urf Twitter',
    default: '5urf Twitter',
  },
  description:
    '무슨 일이 일어나고 있나요? 당신의 생각과 순간을 다른 사람들과 공유해보세요.',
  keywords: ['소셜미디어', '트위터', 'SNS'],
  authors: [{ name: '5urf' }],
  creator: '5urf',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    shortcut: [{ url: '/favicon.ico' }],
  },
  openGraph: {
    title: '5urf Twitter',
    description: '당신의 생각과 순간을 공유하는 공간',
    type: 'website',
    siteName: '5urf Twitter',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pixelFont.variable} ${monoFont.variable}`}>
      <body
        suppressHydrationWarning
        className="mx-auto max-w-screen-sm bg-gray-100 font-mono"
      >
        <Toaster position="bottom-center" offset="80px" richColors />
        {children}
      </body>
    </html>
  );
}
