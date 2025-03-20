import axios from 'axios';
import { useEffect, useState } from 'react';

export interface ChampionStats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

export interface ChampionInfo {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: ChampionInfo;
  tags: string[];
  partype: string;
  stats: ChampionStats;
  image: string;
}

const CHAMPION_DATA_URL =
  'https://ddragon.leagueoflegends.com/cdn/15.5.1/data/en_US/champion.json';
const IMAGE_BASE_URL =
  'https://ddragon.leagueoflegends.com/cdn/15.5.1/img/champion/';

const fetchChampionData = async (): Promise<Champion[]> => {
  try {
    const { data } = await axios.get(CHAMPION_DATA_URL);

    const allChampions = Object.values(data.data).map((champ: any) => ({
      id: champ.id,
      key: champ.key,
      name: champ.name,
      title: champ.title,
      blurb: champ.blurb,
      info: champ.info,
      tags: champ.tags,
      partype: champ.partype,
      stats: champ.stats,
      image: `${IMAGE_BASE_URL}${champ.image.full}`,
    }));

    return allChampions.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching champion data', error);
    return [];
  }
};

export function useChampions() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChampions = async () => {
      setLoading(true);
      const sortedChampions = await fetchChampionData();
      setChampions(sortedChampions);
      setLoading(false);
    };

    getChampions();
  }, []);

  return { champions, loading };
}
