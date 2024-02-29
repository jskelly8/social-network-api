// Imports
const { Schema, Types } = require('mongoose');

// Reaction schema (subdocument in Thought)
const ReactionSchema = new Schema({
  // ID for each reaction that automatically generates
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(), 
  },
  // ReactionBody field
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280, 
  },
  // Username field -- Tracks who made the reaction
  username: {
    type: String,
    required: true,
  },
  // CreatedAt field with default value and getter -- Auto set to 'now' -- Formatted as ISO string
  createdAt: {
    type: Date,
    default: Date.now, 
    get: (createdAtVal) => createdAtVal.toISOString(), 
  },
},
// Apply getters defined in schema & Disable automatic _id field for subdocuments
{
  toJSON: {
    getters: true, 
  },
  _id: false, 
});

// Export
module.exports = ReactionSchema;