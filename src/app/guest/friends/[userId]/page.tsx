'use client';
import { usePathname } from 'next/navigation';

export default function NickNamePage() {
  const pathname = usePathname();
  return (
    <div>
      <div>{pathname}</div>
    </div>
  );
}
