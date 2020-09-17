import DOM from "./dom";
import { Collection, Deck, Card, getCardFromCollection, getRequirements } from "./cards";

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
            const requirements: [Card, number][] = getRequirements(card, cardCollection);
            const requirementsCell = DOM.createChild(row, 'td');
            if (requirements.length > 0) {
                const requirementsList = DOM.createChild(requirementsCell, 'ul');
                for (const requirement of requirements) {
                    DOM.createChildWithText(requirementsList, 'li', `${requirement[0].name} (${requirement[1]})`);
                }
            }

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
    function totalCost(card: Card, collection: Collection, costMap: Map<Card, number>): number {
        if (costMap.has(card)) {
            return costMap.get(card);
        }

        const requirements: [Card, number][] = getRequirements(card, collection);
        let sumCost = card.cost;
        for (const [requiredCard, quantity] of requirements) {
            sumCost += (totalCost(requiredCard, collection, costMap) * quantity);
        }

        costMap.set(card, sumCost);
        return sumCost;
    }

    return root;
}
