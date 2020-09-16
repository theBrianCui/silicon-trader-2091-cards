import DOM from "./dom";
import { Collection, Deck, Card } from "./cards";

export default function(cardCollection: Collection): HTMLTableElement {
    const root = DOM.createElement('table') as HTMLTableElement;
    const header = DOM.createChild(root, 'tr');

    // Create table header
    const columns = ["Tier", "Name", "Base Cost", "Requirements", "Total Cost", "Value", "Max Profit"];
    for (const columnName of columns) {
        DOM.createChildWithText(header, 'th', columnName);
    }

    // Populate cards
    const costMap: Map<Card, number> = new Map();
    let tier = 1;
    for (const deck of cardCollection) {
        for (const card of deck) {
            const row = DOM.createChild(root, 'tr');

            // Tier
            DOM.createChildWithText(row, 'td', tier.toString());

            // Name
            DOM.createChildWithText(row, 'td', card.name);

            // Base Cost
            DOM.createChildWithText(row, 'td', card.cost.toString());

            // Requirements
            DOM.createChildWithText(row, 'td', '');

            // Total Cost
            const cardTotalCost = totalCost(card, cardCollection, costMap);
            DOM.createChildWithText(row, 'td', cardTotalCost.toString());

            // Value
            DOM.createChildWithText(row, 'td', card.value.toString());

            // Max Profit
            DOM.createChildWithText(row, 'td', `${card.value - cardTotalCost}`)
        }

        tier++;
    }

    // Compute total costs
    function getCard(name: string, collection: Collection): Card {
        for (const deck of collection) {
            for (const card of deck) {
                if (card.name === name) {
                    return card;
                }
            }
        }

        throw new Error(`Card ${name} was not found in collection ${collection}`);
    }

    function totalCost(card: Card, collection: Collection, costMap: Map<Card, number>): number {
        if (costMap.has(card)) {
            return costMap.get(card);
        }

        if (!card.requires) {
            costMap.set(card, card.cost);
            return card.cost;
        }

        let sumCost = card.cost;
        for (const requirement in card.requires) {
            if (!card.requires.hasOwnProperty(requirement)) {
                continue;
            }

            const requiredCard: Card = getCard(requirement, collection);
            sumCost += totalCost(requiredCard, collection, costMap);
        }

        costMap.set(card, sumCost);
        return sumCost;
    }

    return root;
}
