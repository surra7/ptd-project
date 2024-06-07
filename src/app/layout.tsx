import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import '@/styles/reset.css';
import '@/styles/globals.css';
import { ReactQueryClientProvider } from '@/libs/ReactQueryClientProvider';

const notoSansKR = Noto_Sans_KR({ subsets: ['latin'], variable: '--font-noto' });

export const metadata: Metadata = {
  title: 'PeTodo App',
  description: 'Pet Care To-Do App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <link rel="icon" href="/PTDLogo.png" sizes="any" />
        <body className={notoSansKR.className}>
          <div className="w-mobile h-mobile bg-white">{children}</div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
