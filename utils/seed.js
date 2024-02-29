// Imports
const connection = require('../config/connection');
const { User, Thought } = require('../models');

// Sample Data
const usersData = [

];

const thoughtsData = [

];

const reactionsData = [

];

// Seed the database
const seedDatabase = async () => {

};

// Call seed function
seedDatabase().catch(err => {
    console.log(err);
    process.exit(0);
});