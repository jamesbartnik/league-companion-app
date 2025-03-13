export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1>League of Legends Companion Application</h1>
      <p>Created by James Bartnik</p>
    </main>
  );
}

/*

Ideas for more pages / more functionality in the app
  - Allow the user to enter their Username/Tag to search up some user specific stats (https://developer.riotgames.com/apis#account-v1/GET_getByRiotId)
  - Store user's puuid with Jotai (or another state manager) and use to fetch data like
    - Champion mastery (https://developer.riotgames.com/apis#champion-mastery-v4/GET_getAllChampionMasteriesByPUUID)
    - Progressed challenges (https://developer.riotgames.com/apis#lol-challenges-v1/GET_getPlayerData)

  - League of Legends server status (https://developer.riotgames.com/apis#lol-status-v4/GET_getPlatformData)

 */
