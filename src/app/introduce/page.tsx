'use client';
import React from 'react';
import Link from 'next/link';
import Carousel from './Carousel';

function page() {
  return (
    <main className="w-mobile h-mobile overflow-hidden">
      <div className="w-mobile h-mobile pt-10 flex flex-col gap-10">
        <div className="flex justify-end relative">
          <Link href={'login'} className="text-right pr-5 text-black-300 hover:text-primary-400">
            SKIP
          </Link>
        </div>
        <Carousel />
      </div>
    </main>
  );
}

export default page;
