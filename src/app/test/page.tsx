import React from 'react';
import { User, userAtom } from '@/atoms/atoms';
import { useAtom } from 'jotai';
function page() {
  const [user, setUser] = useAtom<User | null>(userAtom);
  return (
    <div>
      {user?.id} {user?.계정}
    </div>
  );
}

export default page;
