import React from 'react';
import { Activity } from 'lucide-react';
import type { CurrentGame } from '../types';

interface LiveGameProps {
  game: CurrentGame | null;
  loading: boolean;
}

export const LiveGame: React.FC<LiveGameProps> = ({ game, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 bg-slate-800 rounded-lg">
        <Activity className="w-6 h-6 text-blue-400 animate-pulse" />
        <span className="ml-2 text-slate-300">Loading live game...</span>
      </div>
    );
  }

  if (!game) {
    return null;
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Live Game</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Blue Team */}
        <div className="space-y-2">
          <h3 className="text-blue-400 font-semibold">Blue Team</h3>
          {game.participants
            .filter((p) => p.teamId === 100)
            .map((participant) => (
              <div key={participant.summonerName} className="flex items-center gap-2 text-slate-300">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${participant.championId}.png`}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <span>{participant.summonerName}</span>
              </div>
            ))}
        </div>
        {/* Red Team */}
        <div className="space-y-2">
          <h3 className="text-red-400 font-semibold">Red Team</h3>
          {game.participants
            .filter((p) => p.teamId === 200)
            .map((participant) => (
              <div key={participant.summonerName} className="flex items-center gap-2 text-slate-300">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${participant.championId}.png`}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <span>{participant.summonerName}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};