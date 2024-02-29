// Imports
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/connection');
const routes = require('./routes');

// Express initialization & Port to listen on
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Establish connection to MongoDB using Mongoose
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });