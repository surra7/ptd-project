'use client';
import { Button } from '@/stories/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>메인 페이지</div>
      <Link href="/login">
        <Button label="login" />
      </Link>
      <Link href="/login">
        <Button label="nick name" />
      </Link>
    </main>
  );
}
