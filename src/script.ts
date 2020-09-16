import * as Cards from './scripts/cards';
import CardTable from './scripts/cardTable';

console.log(Cards.allCards.Supplies);
document.body.appendChild(CardTable(Cards.allCards.Supplies));
