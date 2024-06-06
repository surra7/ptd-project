'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';

interface User {
  id: number;
  계정: string;
}

export default function Page() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://api.oz-02-main-04.xyz/api/v1/users/myinfo', {
          withCredentials: true,
        });
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div>
        {/* <p>아이디: {user?.id}</p> */}
        <p>안녕하세요 {user?.계정} 님</p>
      </div>
    </>
  );
}
