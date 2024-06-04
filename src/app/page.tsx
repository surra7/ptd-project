'use client';
import { atom } from 'jotai';

export const nickNameAtom = atom('nick');
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>메인 페이지</div>
    </main>
  );
}
