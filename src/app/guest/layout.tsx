'use client';
import NavBottom from '@/components/NavBottom';

export default function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full bg-white">
      <div className="wrap-section">{children}</div>
      <NavBottom />
    </div>
  );
}
