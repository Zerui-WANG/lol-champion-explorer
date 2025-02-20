import React from 'react';
import { X, Shield, Sword, Star, Zap } from 'lucide-react';
import type { Champion } from '../types';

interface ChampionModalProps {
  champion: Champion;
  onClose: () => void;
}

export const ChampionModal: React.FC<ChampionModalProps> = ({ champion, onClose }) => {
  if (!champion) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{champion.name || 'Unknown Champion'}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
              alt={champion.name || 'Champion splash art'}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-xl font-bold">{champion.title || 'Unknown Title'}</h3>
              <p className="text-slate-300">{champion.blurb || 'No description available.'}</p>
            </div>
          </div>

          <div className="space-y-4">
            {champion.passive && (
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <h4 className="font-semibold text-lg">{champion.passive.name || 'Passive Ability'}</h4>
                </div>
                <p className="text-slate-300">{champion.passive.description || 'No description available.'}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(champion.spells || []).map((spell, index) => (
                <div key={spell?.id || index} className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {index === 0 && <Sword className="w-6 h-6 text-blue-400" />}
                    {index === 1 && <Shield className="w-6 h-6 text-green-400" />}
                    {index === 2 && <Zap className="w-6 h-6 text-purple-400" />}
                    {index === 3 && <Star className="w-6 h-6 text-red-400" />}
                    <div>
                      <h4 className="font-semibold text-lg">{spell?.name || `Ability ${index + 1}`}</h4>
                      <p className="text-xs text-slate-400">Ability {index + 1}</p>
                    </div>
                  </div>
                  <p className="text-slate-300">{spell?.description || 'No description available.'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};