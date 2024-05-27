enum Suite {
  Hearts = "Hearts",
  Diamonds = "Diamonds",
  Clubs = "Clubs",
  Spades = "Spades",
}

enum Rank {
  Two = "Two",
  Three = "Three",
  Four = "Four",
  Five = "Five",
  Six = "Six",
  Seven = "Seven",
  Eight = "Eight",
  Nine = "Nine",
  Ten = "Ten",
  Jack = "Jack",
  Queen = "Queen",
  King = "King",
  Ace = "Ace",
}

type Card = [Suite, Rank];

// Create a card
const card: Card = [Suite.Hearts, Rank.Ace];

// Function to print a card
function printCard(card: Card): void {
  console.log(`Card: ${card[1]} of ${card[0]}`);
}

// Print the card
printCard(card); // Output: Card: Ace of Hearts
