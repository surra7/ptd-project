import React from 'react';
import { User, userAtom } from '@/atoms/atoms';
import { useAtom } from 'jotai';

function Test2() {
  const [user, setUser] = useAtom<User | null>(userAtom);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>User ID: {user.id}</p>
      <p>Account: {user['계정']}</p>
    </div>
  );
}

export default Test2;
