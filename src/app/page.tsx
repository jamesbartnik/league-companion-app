'use client';

import { atom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import { useChampions } from '@/app/hooks/useChampions';
import { useGetAccountByRiotId } from '@/app/hooks/useGetAccountByRiotId';
import { useGetChampionMasteryByPuuid } from '@/app/hooks/useGetChampionMasteryByPuuid';

export interface UserPuuidResponse {
  puuid: string;
  gameName: string;
  tagLine: string;
}

const userPuuidAtom = atom<UserPuuidResponse | null>(null);

export default function Home() {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('NA1');
  const [userPuuid, setUserPuuid] = useAtom(userPuuidAtom);
  const { champions, loading } = useChampions();

  const {
    data: accountData,
    loading: isAccountLoading,
    error: accountError,
    fetchData,
  } = useGetAccountByRiotId();
  const {
    data: masteryData,
    loading: isMasteryLoading,
    error: masteryError,
    fetchData: fetchMasteryData,
  } = useGetChampionMasteryByPuuid();

  const handleFetchUser = async () => {
    await fetchData(gameName, tagLine);
    console.log("Fetched user's puuid", userPuuid);
  };
  const handleFetchMasteries = async (userPuuid: string) => {
    await fetchMasteryData(userPuuid);
    console.log("Fetched user's puuid", userPuuid);
  };

  useEffect(() => {
    if (accountData) {
      setUserPuuid(accountData);
      void handleFetchMasteries(accountData.puuid);
    }
  }, [accountData, setUserPuuid]);

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center p-24'>
      {userPuuid ? (
        <div className='flex flex-col items-center justify-center gap-4'>
          <div>Welcome {gameName}!</div>
          {masteryData && JSON.stringify(masteryData)}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-3xl font-bold'>
              League of Legends Companion Application
            </h1>
            <p>Created by James Bartnik</p>
          </div>

          <div className='mt-6 flex flex-col gap-4'>
            <div>
              <input
                type='text'
                placeholder='Enter Game Name'
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                className='rounded border p-2'
              />
              <input
                type='text'
                placeholder='Enter Tag Line (e.g. NA1)'
                value={tagLine}
                onChange={(e) => setTagLine(e.target.value)}
                className='w-12 rounded border p-2'
              />
            </div>

            <button
              onClick={handleFetchUser}
              className='rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400'
              disabled={isAccountLoading}
            >
              {isAccountLoading ? 'Fetching...' : 'Fetch Riot ID'}
            </button>
            {accountError && <p className='text-red-500'>{accountError}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

/*

Ideas for more pages / more functionality in the app
  - Store user's puuid with Jotai (or another state manager) and use to fetch data like
    - Champion mastery (https://developer.riotgames.com/apis#champion-mastery-v4/GET_getAllChampionMasteriesByPUUID)
    - Progressed challenges (https://developer.riotgames.com/apis#lol-challenges-v1/GET_getPlayerData)

  - League of Legends server status (https://developer.riotgames.com/apis#lol-status-v4/GET_getPlatformData)

 */
