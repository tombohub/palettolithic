from dataclasses import dataclass
from enum import Enum


# Define enums for Suite and Rank
class SuiteType(Enum):
    HEARTS = "Hearts"
    DIAMONDS = "Diamonds"
    CLUBS = "Clubs"
    SPADES = "Spades"


class RankType(Enum):
    TWO = "Two"
    THREE = "Three"
    FOUR = "Four"
    FIVE = "Five"
    SIX = "Six"
    SEVEN = "Seven"
    EIGHT = "Eight"
    NINE = "Nine"
    TEN = "Ten"
    JACK = "Jack"
    QUEEN = "Queen"
    KING = "King"
    ACE = "Ace"


# Define data classes for each suite
@dataclass
class Hearts:
    rank: RankType


@dataclass
class Diamonds:
    rank: RankType


@dataclass
class Clubs:
    rank: RankType


@dataclass
class Spades:
    rank: RankType


# Define a union type for Card
Card = Hearts | Diamonds | Clubs | Spades


# Function to describe a card using pattern matching
def describe_card(card: Card) -> str:
    match card:
        case he:
            return "sda"


# Example usage
card1 = Hearts(RankType.FIVE)
card2 = Clubs(RankType.ACE)

print(describe_card(card1))  # Output: Hearts: Five
print(describe_card(card2))  # Output: Clubs: Ace
