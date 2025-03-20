import { useEffect, useState } from 'react';

export interface RewardConfigDto {
  rewardValue: string;
  rewardType: string;
  maximumReward: number;
}

export interface NextSeasonMilestonesDto {
  requireGradeCounts: Record<string, number>;
  rewardMarks: number;
  bonus: boolean;
  rewardConfig: RewardConfigDto;
}

export interface ChampionMastery {
  championId: number;
  championLevel: number;
  championPoints: number;
  championPointsUntilNextLevel: number;
  lastPlayTime: number;
  championPointsSinceLastLevel: number;
  tokensEarned: number;
}

export interface EnrichedChampionMastery extends ChampionMastery {
  championName: string;
  championIcon: string;
}

export interface ChampionInfo {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export interface ChampionStats {
  hp: number;
  mp: number;
  armor: number;
  spellblock: number;
  attackrange: number;
  movespeed: number;
  attackdamage: number;
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

export function useChampionMasteryData(masteryData: ChampionMastery[]) {
  const [championMap, setChampionMap] = useState<Record<
    number,
    Champion
  > | null>(null);
  const [enrichedMasteryData, setEnrichedMasteryData] = useState<
    EnrichedChampionMastery[] | null
  >(null);

  useEffect(() => {
    async function fetchChampionData() {
      try {
        const response = await fetch(CHAMPION_DATA_URL);
        const data = await response.json();

        const mappedChampions: Record<number, Champion> = {};
        Object.values(data.data).forEach((champ: any) => {
          mappedChampions[parseInt(champ.key, 10)] = {
            id: champ.id,
            key: champ.key,
            name: champ.name,
            title: champ.title,
            blurb: champ.blurb,
            info: champ.info,
            tags: champ.tags,
            partype: champ.partype,
            stats: champ.stats,
            image: `${IMAGE_BASE_URL}${champ.id}.png`,
          };
        });

        setChampionMap(mappedChampions);
      } catch (error) {
        console.error('Error fetching champion data:', error);
      }
    }

    fetchChampionData();
  }, []);

  useEffect(() => {
    if (!championMap || masteryData.length === 0) return;

    const enrichedData = masteryData.map((entry) => {
      const champion = championMap[entry.championId];

      return {
        ...entry,
        championName: champion?.name || 'Unknown',
        championIcon: champion?.image || '',
      };
    });

    setEnrichedMasteryData(enrichedData);
  }, [championMap, masteryData]);

  return enrichedMasteryData;
}
