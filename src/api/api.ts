import axios from 'axios';

const RIOT_API_KEY = 'RGAPI-775a701a-5161-4ab6-94c4-62c20fc99494';
const BASE_URL = 'https://ddragon.leagueoflegends.com/cdn/15.4.1';
const RIOT_API_URL = 'https://euw1.api.riotgames.com';

export const getChampions = async () => {
  const response = await axios.get(`${BASE_URL}/data/en_US/champion.json`);
  return Object.values(response.data.data);
};

export const getChampionDetails = async (championId: string) => {
  const response = await axios.get(`${BASE_URL}/data/en_US/champion/${championId}.json`);
  return response.data.data[championId];
};

export const getCurrentGame = async (summonerName: string) => {
  try {
    // First get summoner ID
    const summonerResponse = await axios.get(
      `${RIOT_API_URL}/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`,
      {
        headers: {
          'X-Riot-Token': RIOT_API_KEY
        }
      }
    );

    // Then get current game info using summoner ID
    const gameResponse = await axios.get(
      `${RIOT_API_URL}/lol/spectator/v4/active-games/by-summoner/${summonerResponse.data.id}`,
      {
        headers: {
          'X-Riot-Token': RIOT_API_KEY
        }
      }
    );
    
    return gameResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error('Summoner is not in an active game');
    }
    throw error;
  }
};