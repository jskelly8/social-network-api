// Imports
const { Schema, model } = require('mongoose');

// User schema
const UserSchema = new Schema({
  // Username field
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  // Email field -- includes regex to validate email
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  // Thought reference array
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  // Friend reference array
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
},
// Include virtuals in JSON output & Prevent the default _id property from being modified
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

// Virtual property -- Returns the number of friends
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length; 
});

// Compile schema into a model
const User = model('User', UserSchema);

// Export
module.exports = User;