'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useGetAccountByRiotId } from '@/app/hooks/useGetAccountByRiotId';
import { gameNameAtom, tagLineAtom, userPuuidAtom } from '@/app/state';

export default function NavBar() {
  const [gameName, setGameName] = useAtom(gameNameAtom);
  const [tagLine, setTagLine] = useAtom(tagLineAtom);
  const [userPuuid, setUserPuuid] = useAtom(userPuuidAtom);

  const {
    data: accountData,
    loading: isAccountLoading,
    error: accountError,
    fetchData,
  } = useGetAccountByRiotId();

  const [isUserFetched, setIsUserFetched] = useState(false);

  const handleGameNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGameName(e.target.value);
  const handleTagLineChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTagLine(e.target.value);

  const handleFetchUser = async () => {
    await fetchData(gameName, tagLine);
    setIsUserFetched(true);
  };

  useEffect(() => {
    if (accountData) {
      document.cookie = `gameName=${gameName}; max-age=${7 * 24 * 60 * 60}; path=/`;
      document.cookie = `tagLine=${tagLine}; max-age=${7 * 24 * 60 * 60}; path=/`;
      document.cookie = `userPuuid=${JSON.stringify(accountData)}; max-age=${7 * 24 * 60 * 60}; path=/`;
      setUserPuuid(accountData);
    }
  }, [accountData, gameName, tagLine, setUserPuuid]);

  // Retrieve data from cookies if available
  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const cookieMap = cookies.reduce(
      (acc: { [key: string]: string }, cookie: string) => {
        const [key, value] = cookie.split('=');
        acc[key] = decodeURIComponent(value);
        return acc;
      },
      {}
    );

    const storedGameName = cookieMap['gameName'];
    const storedTagLine = cookieMap['tagLine'];
    const storedPuuid = cookieMap['userPuuid'];

    if (storedGameName && storedTagLine && storedPuuid) {
      setGameName(storedGameName);
      setTagLine(storedTagLine);

      try {
        const parsedPuuid = JSON.parse(storedPuuid);
        setUserPuuid(parsedPuuid);
      } catch (error) {
        console.error('Failed to parse user PUUID:', error);
      }
    }
  }, []);

  return (
    <nav className='w-full bg-gray-900 p-4 text-white shadow-lg'>
      <div className='mx-auto flex max-w-7xl items-center justify-between'>
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

        {isUserFetched ? (
          <div className='text-white'>
            <span className='text-lg font-bold'>
              {gameName}#{tagLine}
            </span>{' '}
          </div>
        ) : (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className='cursor-pointer hover:text-gray-300'>
              Settings
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              className='rounded-lg bg-gray-800 p-4 text-white shadow-lg'
              side='bottom'
              align='end'
            >
              <form onSubmit={(e) => e.preventDefault()} className='space-y-4'>
                <div>
                  <label htmlFor='gameName' className='block text-sm'>
                    Game Name
                  </label>
                  <input
                    type='text'
                    id='gameName'
                    value={gameName}
                    onChange={handleGameNameChange}
                    className='mt-1 w-full rounded-md bg-gray-700 p-2 text-white'
                    placeholder='Enter your game name'
                  />
                </div>
                <div>
                  <label htmlFor='tagLine' className='block text-sm'>
                    Tag Line
                  </label>
                  <input
                    type='text'
                    id='tagLine'
                    value={tagLine}
                    onChange={handleTagLineChange}
                    className='mt-1 w-full rounded-md bg-gray-700 p-2 text-white'
                    placeholder='Enter your tag line'
                  />
                </div>
                <button
                  type='button'
                  onClick={handleFetchUser}
                  className='w-full rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400'
                  disabled={isAccountLoading}
                >
                  {isAccountLoading ? 'Fetching...' : 'Fetch Riot ID'}
                </button>
                {accountError && <p className='text-red-500'>{accountError}</p>}
              </form>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </div>
    </nav>
  );
}
