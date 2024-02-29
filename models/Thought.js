// Imports
const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction'); // Reaction schema subdocument

// Thought schema
const ThoughtSchema = new Schema({
  // ThoughtText field 
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  // CreatedAt field with default value and getter -- Auto set to 'now' -- Formatted as ISO string
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => createdAtVal.toISOString(),
  },
  // Username field -- Tracks thought's author
  username: {
    type: String,
    required: true,
  },
  // Reactions array using the Reaction schema
  reactions: [ReactionSchema],
},
// Include virtuals in JSON output & Apply getters defined in schema
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

// Virtual property -- Counts reactions
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Compile schema into a model
const Thought = model('Thought', ThoughtSchema);

// Export
module.exports = Thought;