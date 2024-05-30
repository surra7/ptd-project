'use client';
import { MyButton } from '@/components/MyButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>메인 페이지</div>
      <MyButton children="버튼1" />
    </main>
  );
}
