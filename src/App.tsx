import { Dice1 as GamingDice } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getChampions, getCurrentGame } from './api/api';
import { ChampionCard } from './components/ChampionCard';
import { LiveGame } from './components/LiveGame';
import { SearchBar } from './components/SearchBar';
import type { Champion, CurrentGame } from './types';

function App() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentGame, setCurrentGame] = useState<CurrentGame | null>(null);
  const [loading, setLoading] = useState(false);
  const [summonerName, setSummonerName] = useState('');

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const data = await getChampions();
        setChampions(data);
      } catch (error) {
        console.error('Error fetching champions:', error);
      }
    };

    fetchChampions();
  }, []);

  const handleSearchLiveGame = async () => {
    if (!summonerName) return;

    setLoading(true);
    try {
      const game = await getCurrentGame(summonerName);
      setCurrentGame(game);
    } catch (error) {
      console.error('Error fetching live game:', error);
      setCurrentGame(null);
    } finally {
      setLoading(false);
    }
  };

  const filteredChampions = champions.filter((champion) =>
    champion.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-[2000px] mx-auto">
        <div className="flex items-center justify-center mb-8">
          <GamingDice className="w-10 h-10 text-blue-400 mr-3" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            LoL Champion Explorer
          </h1>
        </div>

        <div className="mb-8 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          <div className="flex gap-4 justify-center">
            <input
              type="text"
              value={summonerName}
              onChange={(e) => setSummonerName(e.target.value)}
              placeholder="Enter summoner name..."
              className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSearchLiveGame}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              Check Live Game
            </button>
          </div>
        </div>

        {currentGame && <LiveGame game={currentGame} loading={loading} />}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filteredChampions.map((champion) => (
            <ChampionCard key={champion.id} champion={champion} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;