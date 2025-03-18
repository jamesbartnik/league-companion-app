import { useState } from 'react';

import { UserPuuidResponse } from '@/app/page';

export function useGetAccountByRiotId() {
  const [data, setData] = useState<UserPuuidResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (gameName: string, tagLine: string) => {
    if (!gameName || !tagLine) {
      setError('Please enter both Game Name and Tag Line.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/league-of-legends/get-account-by-riot-id?gameName=${encodeURIComponent(gameName)}&tagLine=${encodeURIComponent(tagLine)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch data');
      }

      const result: UserPuuidResponse = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
