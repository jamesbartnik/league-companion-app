'use client';

import test from '@/app/actions/test';

export default function Flux() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Flux</h1>
      <button
        onClick={async () => {
          const result = await test();
          console.log(result);
        }}
      >
        Click me
      </button>
    </main>
  );
}
