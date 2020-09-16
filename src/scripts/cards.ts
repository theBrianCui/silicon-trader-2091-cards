import Supplies from '../cards/supplies.json';

export interface Card {
    name: string,
    value: number,
    cost: number,
    requires?: {
        [key: string]: number
    }
}

export type Deck = Card[];
export type Collection = Deck[];
export type Game = {
    [key: string]: Collection
}

export const allCards: Game = {
    Supplies
}
