export interface Champion {
  id: string;
  name: string;
  title: string;
  blurb: string;
  image: {
    full: string;
  };
  spells: Spell[];
  passive: {
    name: string;
    description: string;
    image: {
      full: string;
    };
  };
}

export interface Spell {
  id: string;
  name: string;
  description: string;
  image: {
    full: string;
  };
}

export interface CurrentGame {
  gameId: number;
  participants: {
    championId: number;
    summonerName: string;
    teamId: number;
  }[];
}