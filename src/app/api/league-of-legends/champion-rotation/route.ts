import { NextResponse } from 'next/server';

const RIOT_API_URL =
  'https://na1.api.riotgames.com/lol/platform/v3/champion-rotations';

export async function GET() {
  try {
    const response = await fetch(`${RIOT_API_URL}`, {
      headers: {
        'X-Riot-Token': process.env.RIOT_API_KEY as string,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
