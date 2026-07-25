import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "animals",
    name: "Animals",
    words: [
      "Lion", "Elephant", "Giraffe", "Penguin", "Kangaroo", "Dolphin", "Tiger",
      "Panda", "Owl", "Cheetah", "Zebra", "Koala", "Fox", "Wolf", "Rabbit",
      "Turtle", "Octopus", "Eagle", "Shark", "Bear", "Camel", "Hedgehog",
      "Flamingo", "Otter", "Peacock", "Moose", "Raccoon", "Sloth", "Chameleon",
      "Gorilla",
    ],
  },
  {
    id: "movies",
    name: "Movies",
    words: [
      "Titanic", "Inception", "Jaws", "Frozen", "Gladiator", "Avatar", "Up",
      "Coco", "The Matrix", "Jurassic Park", "Toy Story", "The Godfather",
      "Rocky", "Shrek", "The Lion King", "Casablanca", "Alien", "Ghostbusters",
      "Grease", "Moana", "The Avengers", "Back to the Future", "E.T.",
      "Finding Nemo", "The Shining", "Star Wars", "Home Alone", "The Notebook",
      "Interstellar", "Barbie",
    ],
  },
  {
    id: "food",
    name: "Food",
    words: [
      "Pizza", "Sushi", "Taco", "Burger", "Pancake", "Spaghetti", "Popcorn",
      "Waffle", "Burrito", "Sandwich", "Pretzel", "Dumpling", "Croissant",
      "Lasagna", "Curry", "Nachos", "Ramen", "Pie", "Ice Cream", "Bagel",
      "Hot Dog", "Salad", "Fries", "Steak", "Cheesecake", "Donut", "Chili",
      "Omelet", "Falafel", "Pho",
    ],
  },
  {
    id: "sports",
    name: "Sports",
    words: [
      "Soccer", "Basketball", "Tennis", "Golf", "Baseball", "Hockey",
      "Volleyball", "Swimming", "Boxing", "Cricket", "Rugby", "Skiing",
      "Surfing", "Cycling", "Bowling", "Archery", "Wrestling", "Badminton",
      "Skateboarding", "Gymnastics", "Fencing", "Rowing", "Curling",
      "Snowboarding", "Table Tennis", "Track and Field", "Karate",
      "Weightlifting", "Darts", "Lacrosse",
    ],
  },
  {
    id: "occupations",
    name: "Occupations",
    words: [
      "Doctor", "Teacher", "Firefighter", "Chef", "Pilot", "Plumber",
      "Electrician", "Lawyer", "Nurse", "Farmer", "Dentist", "Mechanic",
      "Photographer", "Architect", "Librarian", "Veterinarian", "Journalist",
      "Barber", "Accountant", "Astronaut", "Police Officer", "Scientist",
      "Carpenter", "Musician", "Artist", "Waiter", "Engineer", "Tailor",
      "Baker", "Coach",
    ],
  },
  {
    id: "places",
    name: "Places",
    words: [
      "Beach", "Mountain", "Airport", "Library", "Hospital", "Castle",
      "Desert", "Zoo", "Museum", "Stadium", "Forest", "Volcano", "Island",
      "Farm", "School", "Restaurant", "Cave", "Waterfall", "Lighthouse",
      "Amusement Park", "Cruise Ship", "Cabin", "Bakery", "Aquarium",
      "Garden", "Market", "Church", "Skyscraper", "Campground", "Harbor",
    ],
  },
  {
    id: "tv-shows",
    name: "TV Shows",
    words: [
      "Friends", "The Office", "Stranger Things", "Breaking Bad", "The Simpsons",
      "Game of Thrones", "SpongeBob SquarePants", "The Crown", "Seinfeld",
      "Sherlock", "The Mandalorian", "Grey's Anatomy", "South Park",
      "The Big Bang Theory", "Cheers", "Dexter", "Community", "Parks and Recreation",
      "Ted Lasso", "The Walking Dead", "Modern Family", "Money Heist",
      "Better Call Saul", "Doctor Who", "The Bear",
    ],
  },
  {
    id: "superheroes",
    name: "Superheroes",
    words: [
      "Superman", "Batman", "Spider-Man", "Wonder Woman", "Iron Man",
      "Captain America", "The Hulk", "Thor", "Black Panther", "Flash",
      "Aquaman", "Wolverine", "Black Widow", "Green Lantern", "Doctor Strange",
      "Ant-Man", "Captain Marvel", "Deadpool", "Catwoman", "Hawkeye",
      "Storm", "Green Arrow", "Nightwing", "Scarlet Witch", "Cyborg",
    ],
  },
];

export function findCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
