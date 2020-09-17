# Silicon Trader 2091 Cards

This repository houses the metadata for all the card types in *Silicon Trader 2091*.

All cards are defined in JSON files in the `src/cards` directory. The JSON schema follows the format:

```
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
```

For example, the **Refined Metals** card appears as follows:

```
{
    "name": "Refined Metals",
    "value": 7,
    "cost": 1,
    "upkeep": 1,
    "requires": {
        "Metal Ore": 1
    },
    "notes": "Valuable and required for the most complex goods."
}
```

The included webapp provides a table view of all cards and calculates the *total cost* of each card recursively based on their requirements. 

## Setup

```
npm install
```

## Development

```
npm run dev
```
Then, visit `localhost:1234` in your browser. Changes are reflected in real time.