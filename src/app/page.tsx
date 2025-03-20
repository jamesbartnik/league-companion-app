'use client';

import ChampionMasteryList from '@/components/ChampionMasteryList';

export default function Home() {
  return (
    <div className='relative flex min-h-screen w-full flex-col items-center justify-center p-4'>
      <ChampionMasteryList />
    </div>
  );
}
