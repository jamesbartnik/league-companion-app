import { useAtom } from 'jotai';

import {
  EnrichedChampionMastery,
  useChampionMasteryData,
} from '@/app/hooks/useChampionMasteryData';
import { useGetChampionMasteryByPuuid } from '@/app/hooks/useGetChampionMasteryByPuuid';
import { userPuuidAtom } from '@/app/state';

export default function ChampionMasteryList() {
  // Assuming userPuuidAtom holds an object of type UserPuuidResponse or null
  const [userPuuid] = useAtom(userPuuidAtom);

  // Extract the `puuid` string from the UserPuuidResponse object
  const puuidString = userPuuid?.puuid || null; // Extract puuid or use null if unavailable

  const {
    data: masteryData,
    loading: isMasteryLoading,
    error: masteryError,
  } = useGetChampionMasteryByPuuid(puuidString);

  const enrichedMastery = useChampionMasteryData(masteryData || []);

  // Handle the loading state
  if (isMasteryLoading) {
    return <p>Loading...</p>;
  }

  // Handle the case where no mastery data is available
  if (!puuidString) {
    return <p>You need to sign in to view your champion mastery data.</p>;
  }

  if (!enrichedMastery || enrichedMastery.length === 0) {
    return <p>No champion mastery data available.</p>;
  }

  return (
    <div className='flex flex-col gap-8'>
      <h1 className='flex items-center justify-center text-3xl font-bold'>
        Champion Mastery Data
      </h1>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {enrichedMastery.map((champ: EnrichedChampionMastery) => (
          <div
            key={champ.championId}
            className='rounded-lg bg-gray-800 p-6 text-white shadow-lg transition-shadow duration-300 hover:shadow-xl'
          >
            <img
              src={champ.championIcon}
              alt={champ.championName}
              className='mx-auto mb-4 h-24 w-24 rounded-full border-4 border-blue-500'
            />
            <h3 className='mb-2 text-center text-lg font-bold'>
              {champ.championName}
            </h3>
            <div className='space-y-3'>
              <div>
                <p className='text-sm font-bold'>Level</p>
                <p className='text-xl'>{champ.championLevel}</p>
              </div>
              <div>
                <p className='text-sm font-bold'>Champion Points</p>
                <p className='text-xl'>{champ.championPoints}</p>
              </div>
              <div>
                <p className='text-sm font-bold'>Tokens Earned</p>
                <p className='text-xl'>{champ.tokensEarned}</p>
              </div>
              <div>
                <p className='text-sm font-bold'>Until Next Level</p>
                <p className='text-xl'>{champ.championPointsUntilNextLevel}</p>
              </div>
              <div>
                <p className='text-sm font-bold'>Last Played</p>
                <p className='text-lg'>
                  {new Date(champ.lastPlayTime).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className='text-sm font-bold'>Points Since Last Level</p>
                <p className='text-lg'>{champ.championPointsSinceLastLevel}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
