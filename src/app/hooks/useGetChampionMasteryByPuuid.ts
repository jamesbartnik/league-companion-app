import { useState } from 'react';

export interface ChampionMasteryResponse {
  championId: number;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
  tokensEarned: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
}

export function useGetChampionMasteryByPuuid(puuid: string | null) {
  const [data, setData] = useState<ChampionMasteryResponse[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!puuid) {
      setError('Please enter a valid PUUID.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/league-of-legends/get-all-champion-masteries-by-puuid?puuid=${encodeURIComponent(puuid)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Failed to fetch champion mastery data'
        );
      }

      const result: ChampionMasteryResponse[] = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when puuid changes
  if (puuid) {
    fetchData();
  }

  return { data, loading, error };
}
