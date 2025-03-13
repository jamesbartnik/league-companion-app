'use client';

import { Dialog } from '@radix-ui/react-dialog';
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
      ) : error ? (
        <p>Error loading champions</p>
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
          <Dialog
            open={!!selectedChampion}
            onOpenChange={() => setSelectedChampion(null)}
          >
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-50' />
            <Dialog.Content className='fixed inset-1/4 w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg'>
              <Dialog.Title className='text-3xl font-semibold'>
                {selectedChampion?.name}
              </Dialog.Title>
              <p className='text-lg'>{selectedChampion?.title}</p>
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

              {/* Champion Stats */}
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

              <Dialog.Close className='mt-4 rounded bg-blue-500 p-2 text-white'>
                Close
              </Dialog.Close>
            </Dialog.Content>
          </Dialog>
        </>
      )}
    </main>
  );
}
