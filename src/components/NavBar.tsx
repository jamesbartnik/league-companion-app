'use client';

import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className='w-full bg-gray-900 p-4 text-white shadow-lg'>
      <div className='mx-auto flex max-w-7xl items-center justify-between'>
        <Link href='/' className='text-xl font-bold'>
          League of Legends Companion App
        </Link>
        <div className='space-x-4'>
          <Link href='/' className='hover:text-gray-300'>
            Home
          </Link>
          <Link href='/champions' className='hover:text-gray-300'>
            Champions
          </Link>
          <Link href='/champion-rotation' className='hover:text-gray-300'>
            Champion Rotation
          </Link>
        </div>
      </div>
    </nav>
  );
}
