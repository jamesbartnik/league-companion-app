import axios from 'axios';
import { useEffect, useState } from 'react';

interface Champion {
  id: string;
  name: string;
  title: string;
  image: string;
}

const CHAMPION_DATA_URL =
  'https://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json';
const IMAGE_BASE_URL =
  'https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/';

export const mapChampions = (
  championData: Record<string, any>,
  ids: string[]
): Champion[] =>
  ids
    .map((id) => {
      const champ = Object.values(championData).find((c: any) => c.key === id);
      if (champ) {
        return {
          id: champ.id,
          name: champ.name,
          title: champ.title,
          image: `${IMAGE_BASE_URL}${champ.image.full}`,
        };
      }
      return null;
    })
    .filter(Boolean) as Champion[];

const fetchChampionRotationData = async () => {
  try {
    const [rotationRes, ddragonRes] = await Promise.all([
      axios.get('/api/league-of-legends/champion-rotation'),
      axios.get(CHAMPION_DATA_URL),
    ]);

    const rotationData = rotationRes.data;
    const ddragonData = ddragonRes.data;

    return {
      freeChampions: mapChampions(
        ddragonData.data,
        rotationData.freeChampionIds.map(String)
      ),
      newPlayerChampions: mapChampions(
        ddragonData.data,
        rotationData.freeChampionIdsForNewPlayers.map(String)
      ),
    };
  } catch (error) {
    console.error('Error fetching champion rotation data', error);
    return { freeChampions: [], newPlayerChampions: [] };
  }
};

export function useChampionRotation() {
  const [freeChampions, setFreeChampions] = useState<Champion[]>([]);
  const [newPlayerChampions, setNewPlayerChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChampionRotation = async () => {
      setLoading(true);
      const { freeChampions, newPlayerChampions } =
        await fetchChampionRotationData();
      setFreeChampions(freeChampions);
      setNewPlayerChampions(newPlayerChampions);
      setLoading(false);
    };

    getChampionRotation();
  }, []);

  return { freeChampions, newPlayerChampions, loading };
}
