import Supplies from '../cards/supplies.json';

export interface Card {
    name: string,
    value: number,
    cost: number,
    upkeep: number,
    requires?: {
        [key: string]: number
    }
    notes?: string
}

export type Deck = Card[];
export type Collection = Deck[];
export type Game = {
    [key: string]: Collection
}

export function getCardFromCollection(name: string, collection: Collection): Card {
    for (const deck of collection) {
        for (const card of deck) {
            if (card.name === name) {
                return card;
            }
        }
    }

    throw new Error(`Card ${name} was not found in collection ${collection}`);
}

export type Requirements = [Card, number];
export function getRequirements(card: Card, collection: Collection): [Card, number][] {
    const requirements: [Card, number][] = [];
    if (!card.requires) {
        return requirements;
    }

    for (const requirement in card.requires) {
        if (!card.requires.hasOwnProperty(requirement)) {
            continue;
        }

        requirements.push([getCardFromCollection(requirement, collection),
                           card.requires[requirement]]);
    }

    return requirements;
}

export const allCards: Game = {
    Supplies
}
