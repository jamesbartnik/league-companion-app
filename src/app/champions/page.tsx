'use client';

import { Dialog } from 'radix-ui';
import { useState } from 'react';

import { Champion, useChampions } from '../hooks/useChampions';

export default function Champions() {
  const { champions, loading } = useChampions();
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(
    null
  );

  // Handle champion click
  const handleChampionClick = (champion: Champion) => {
    setSelectedChampion(champion);
  };

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1 className='text-3xl font-bold'>All Champions</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Display champions list */}
          <section className='mb-12'>
            <h2 className='mb-4 text-2xl font-semibold'>All Champions</h2>
            <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {champions.map((champ) => (
                <div
                  key={champ.id}
                  className='cursor-pointer text-center'
                  onClick={() => handleChampionClick(champ)}
                >
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

          {/* Display selected champion's details in a Modal */}
          <Dialog.Root
            open={!!selectedChampion}
            onOpenChange={() => setSelectedChampion(null)}
          >
            <Dialog.Portal>
              <Dialog.Overlay className='fixed inset-0 bg-black opacity-80' />
              <Dialog.Content className='fixed bottom-0 left-0 right-0 top-0 m-auto h-fit w-full max-w-5xl rounded-lg bg-white p-6 shadow-lg'>
                <div className='items-top flex w-full flex-row justify-between'>
                  <Dialog.Title className='text-3xl font-semibold'>
                    {selectedChampion?.name}
                    <p className='text-lg'>{selectedChampion?.title}</p>
                  </Dialog.Title>

                  <Dialog.Close asChild>
                    <button className='mt-4 rounded bg-blue-500 p-2 text-white'>
                      Close
                    </button>
                  </Dialog.Close>
                </div>
                <img
                  src={selectedChampion?.image}
                  alt={selectedChampion?.name}
                  className='mx-auto my-4 h-48 w-48 rounded-lg'
                />
                <Dialog.Description className='mt-4'>
                  <p>
                    <strong>Blurb:</strong> {selectedChampion?.blurb}
                  </p>
                  <p>
                    <strong>Attack:</strong> {selectedChampion?.info.attack}
                  </p>
                  <p>
                    <strong>Defense:</strong> {selectedChampion?.info.defense}
                  </p>
                  <p>
                    <strong>Magic:</strong> {selectedChampion?.info.magic}
                  </p>
                  <p>
                    <strong>Difficulty:</strong>{' '}
                    {selectedChampion?.info.difficulty}
                  </p>
                  <p>
                    <strong>Tags:</strong> {selectedChampion?.tags.join(', ')}
                  </p>
                  <p>
                    <strong>Partype:</strong> {selectedChampion?.partype}
                  </p>
                </Dialog.Description>

                <div className='mt-4'>
                  <h3 className='text-xl font-semibold'>Champion Stats</h3>
                  <ul className='list-disc pl-6'>
                    <li>
                      <strong>Health:</strong> {selectedChampion?.stats.hp}
                    </li>
                    <li>
                      <strong>Mana:</strong> {selectedChampion?.stats.mp}
                    </li>
                    <li>
                      <strong>Attack Damage:</strong>{' '}
                      {selectedChampion?.stats.attackdamage}
                    </li>
                    <li>
                      <strong>Armor:</strong> {selectedChampion?.stats.armor}
                    </li>
                    <li>
                      <strong>Attack Speed:</strong>{' '}
                      {selectedChampion?.stats.attackspeed}
                    </li>
                  </ul>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </>
      )}
    </main>
  );
}
