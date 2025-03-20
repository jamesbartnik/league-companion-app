import { atom } from 'jotai';

export interface UserPuuidResponse {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export const userPuuidAtom = atom<UserPuuidResponse | null>(null);
export const gameNameAtom = atom('JebPowers');
export const tagLineAtom = atom('NA1');
