import React, { useState } from 'react';
import { Shield, Sword, Star, Zap } from 'lucide-react';
import type { Champion } from '../types';
import { ChampionModal } from './ChampionModal';

interface ChampionCardProps {
  champion: Champion;
}

export const ChampionCard: React.FC<ChampionCardProps> = ({ champion }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!champion) {
    return null;
  }

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        <div className="relative">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${champion.image?.full || 'default.png'}`}
            alt={champion.name || 'Champion'}
            className="w-full h-32 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <h3 className="text-sm font-bold text-white">{champion.name || 'Unknown Champion'}</h3>
            <p className="text-xs text-slate-300 truncate">{champion.title || 'No title available'}</p>
          </div>
        </div>

        <div className="p-2 space-y-1">
          <div className="bg-slate-700/50 rounded p-1">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400" />
              <p className="text-xs text-slate-300 truncate">{champion.passive?.name || 'No passive'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1">
            {(champion.spells || []).map((spell, index) => (
              <div key={spell?.id || index} className="bg-slate-700/50 rounded p-1">
                <div className="flex items-center gap-1">
                  {index === 0 && <Sword className="w-3 h-3 text-blue-400" />}
                  {index === 1 && <Shield className="w-3 h-3 text-green-400" />}
                  {index === 2 && <Zap className="w-3 h-3 text-purple-400" />}
                  {index === 3 && <Star className="w-3 h-3 text-red-400" />}
                  <p className="text-xs text-slate-300 truncate">
                    {spell?.name || 'Unknown'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ChampionModal
          champion={champion}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};