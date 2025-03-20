'use client';

import { useChampionRotation } from '../hooks/useChampionRotation';

export default function ChampionRotation() {
  const { freeChampions, newPlayerChampions, loading } = useChampionRotation();

  function ChampionList({
    title,
    champions,
  }: {
    title: string;
    champions: any[];
  }) {
    return (
      <section className='mb-12'>
        <h2 className='mb-4 text-2xl font-semibold'>{title}</h2>
        <div className='grid grid-cols-2 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {champions.map((champ) => (
            <div key={champ.id} className='text-center'>
              <img
                src={champ.image}
                alt={champ.name}
                className='mx-auto h-24 w-24 rounded-lg'
              />
              <p className='font-bold'>{champ.name}</p>
              <p className='text-sm text-gray-500'>{champ.title}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className='relative flex min-h-screen w-full flex-col items-center justify-center p-4'>
      <h1 className='mb-4 text-3xl font-bold'>Champion Rotation</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ChampionList
            title='Free Rotation Champions'
            champions={freeChampions}
          />
          <ChampionList
            title='New Player Rotation Champions'
            champions={newPlayerChampions}
          />
        </>
      )}
    </div>
  );
}
