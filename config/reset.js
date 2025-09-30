import { pool } from './database.js';
import './dotenv.js';

// Coffee methods data
const coffeeMethodsData = [
    {
        id: 'espresso',
        name: 'Espresso',
        type: 'Pressure Brewing',
        difficulty: 'Intermediate',
        brewTime: '25-30 seconds',
        description: 'The foundation of many coffee drinks.',
        equipment: ['Espresso machine', 'Grinder', 'Tamper'],
        grindSize: 'Fine',
        coffeeToWater: '1:2 ratio',
        steps: ['Grind coffee fine', 'Tamp evenly', 'Extract for 25-30 seconds'],
        tips: 'Adjust grind size for timing',
        taste: 'Intense and concentrated'
    },
    {
        id: 'pour-over',
        name: 'Pour Over',
        type: 'Manual Brewing',
        difficulty: 'Beginner',
        brewTime: '3-4 minutes',
        description: 'Clean and bright coffee.',
        equipment: ['V60', 'Filters', 'Kettle'],
        grindSize: 'Medium-fine',
        coffeeToWater: '1:15 ratio',
        steps: ['Heat water', 'Wet filter', 'Pour slowly'],
        tips: 'Pour in circles',
        taste: 'Clean and bright'
    },
    {
        id: 'french-press',
        name: 'French Press',
        type: 'Immersion',
        difficulty: 'Beginner',
        brewTime: '4 minutes',
        description: 'Full-bodied coffee.',
        equipment: ['French press', 'Grinder'],
        grindSize: 'Coarse',
        coffeeToWater: '1:12 ratio',
        steps: ['Add coffee', 'Pour water', 'Wait 4 minutes', 'Press'],
        tips: 'Use coarse grind',
        taste: 'Full-bodied'
    },
    {
        id: 'cold-brew',
        name: 'Cold Brew',
        type: 'Cold extraction',
        difficulty: 'Beginner',
        brewTime: '12-24 hours',
        description: 'Smooth cold coffee.',
        equipment: ['Jar', 'Strainer'],
        grindSize: 'Coarse',
        coffeeToWater: '1:4 ratio',
        steps: ['Mix coffee and water', 'Steep overnight', 'Strain'],
        tips: 'Store in fridge',
        taste: 'Smooth and sweet'
    },
    {
        id: 'aeropress',
        name: 'AeroPress',
        type: 'Pressure',
        difficulty: 'Beginner',
        brewTime: '1-2 minutes',
        description: 'Clean and smooth.',
        equipment: ['AeroPress', 'Filters'],
        grindSize: 'Medium-fine',
        coffeeToWater: '1:14 ratio',
        steps: ['Add coffee', 'Add water', 'Stir', 'Press'],
        tips: 'Try inverted method',
        taste: 'Clean and smooth'
    }
];

const createMethodsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS coffee_methods;

        CREATE TABLE IF NOT EXISTS coffee_methods (
            id VARCHAR(50) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            type VARCHAR(100) NOT NULL,
            difficulty VARCHAR(50) NOT NULL,
            brew_time VARCHAR(50) NOT NULL,
            description TEXT NOT NULL,
            equipment TEXT[] NOT NULL,
            grind_size VARCHAR(50) NOT NULL,
            coffee_to_water VARCHAR(50) NOT NULL,
            steps TEXT[] NOT NULL,
            tips TEXT NOT NULL,
            taste TEXT NOT NULL
        )
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('🎉 coffee_methods table created successfully');
    } catch (err) {
        console.error('⚠️ error creating coffee_methods table', err);
    }
};

const seedMethodsTable = async () => {
    await createMethodsTable();

    coffeeMethodsData.forEach((method) => {
        const insertQuery = {
            text: `INSERT INTO coffee_methods 
                   (id, name, type, difficulty, brew_time, description, equipment, 
                    grind_size, coffee_to_water, steps, tips, taste) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`
        };

        const values = [
            method.id,
            method.name,
            method.type,
            method.difficulty,
            method.brewTime,
            method.description,
            method.equipment,
            method.grindSize,
            method.coffeeToWater,
            method.steps,
            method.tips,
            method.taste
        ];

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting method', err);
                return;
            }

            console.log(`✅ ${method.name} added successfully`);
        });
    });
};

seedMethodsTable();