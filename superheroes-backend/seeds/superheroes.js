const mongoose = require('mongoose');
const Superhero = require('../models/Superhero');
require('dotenv').config();

const sampleSuperheroes = [
  {
    name: "Spider-Man",
    realName: "Peter Parker",
    powers: ["Web-slinging", "Wall-crawling", "Spider-sense", "Superhuman strength", "Superhuman agility"],
    originStory: "Bitten by a radioactive spider, Peter Parker gained spider-like abilities and learned that with great power comes great responsibility.",
    imageUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
    alignment: "hero",
    universe: "marvel"
  },
  {
    name: "Batman",
    realName: "Bruce Wayne",
    powers: ["Martial arts mastery", "Detective skills", "Advanced technology", "Peak human conditioning", "Strategic genius"],
    originStory: "After witnessing his parents' murder as a child, Bruce Wayne dedicated his life to fighting crime as the Dark Knight of Gotham City.",
    imageUrl: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop",
    alignment: "hero",
    universe: "dc"
  },
  {
    name: "Wonder Woman",
    realName: "Diana Prince",
    powers: ["Superhuman strength", "Flight", "Lasso of Truth", "Bulletproof bracelets", "Combat expertise"],
    originStory: "An Amazonian princess from Themyscira, Diana left her island home to fight alongside humanity in the world of men.",
    imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop",
    alignment: "hero",
    universe: "dc"
  },
  {
    name: "Iron Man",
    realName: "Tony Stark",
    powers: ["Powered armor suit", "Genius-level intellect", "Arc reactor technology", "Flight", "Repulsors"],
    originStory: "Billionaire inventor Tony Stark built a powered suit of armor to escape captivity and became the armored Avenger known as Iron Man.",
    imageUrl: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=400&h=600&fit=crop",
    alignment: "hero",
    universe: "marvel"
  },
  {
    name: "The Joker",
    realName: "Unknown",
    powers: ["Criminal mastermind", "Chemical expertise", "Unpredictability", "Immunity to toxins", "Psychological warfare"],
    originStory: "A failed comedian who fell into a vat of chemicals, emerging as Gotham's most dangerous and unpredictable criminal mastermind.",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    alignment: "villain",
    universe: "dc"
  },
  {
    name: "Green Goblin",
    realName: "Norman Osborn",
    powers: ["Superhuman strength", "Goblin glider", "Pumpkin bombs", "Enhanced durability", "Genius intellect"],
    originStory: "Norman Osborn, CEO of Oscorp, became the Green Goblin after exposure to an experimental formula that enhanced his abilities but drove him insane.",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
    alignment: "villain",
    universe: "marvel"
  },
  {
    name: "Captain America",
    realName: "Steve Rogers",
    powers: ["Super-soldier serum", "Vibranium shield", "Enhanced strength", "Enhanced speed", "Leadership"],
    originStory: "A frail young man transformed by the Super-Soldier Serum into America's first super-soldier during World War II.",
    imageUrl: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=400&h=600&fit=crop",
    alignment: "hero",
    universe: "marvel"
  },
  {
    name: "Superman",
    realName: "Clark Kent",
    powers: ["Flight", "Super strength", "Heat vision", "X-ray vision", "Invulnerability", "Super speed"],
    originStory: "The last son of Krypton, sent to Earth as a baby and raised by the Kent family in Smallville, Kansas.",
    imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop",
    alignment: "hero",
    universe: "dc"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/superheroes-directory');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Superhero.deleteMany({});
    console.log('Cleared existing superheroes');

    // Insert sample data
    const createdSuperheroes = await Superhero.insertMany(sampleSuperheroes);
    console.log(`Created ${createdSuperheroes.length} sample superheroes`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { sampleSuperheroes, seedDatabase };