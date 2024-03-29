// Imports
const { User, Thought } = require('../models');

const userController = {
  // GET all users
  async getAllUsers(req, res) {
    try {
      const userData = await User.find({})
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v')
        .sort({ id: -1 });

      res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // GET a single user by id
  async getUserById(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.id })
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v');

      if (!userData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }

      res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // POST a new user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);

      res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // PUT to update a user by id
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.id }, 
        req.body, 
        { new: true, runValidators: true }
      );

      if (!userData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }

      res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // DELETE to remove a user by id
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.id });

      if (!userData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }

      // Bonus: Remove deleted user's thoughts
      await Thought.deleteMany({ _id: { $in: userData.thoughts } });

      res.status(200).json({ message: 'User and their thoughts deleted!' });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // POST to add a new friend to a user's friend list
  async addFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true, runValidators: true}
      );
      
      if (!userData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }

      res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // DELETE to remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      );

      if (!userData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }

      res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

// Export
module.exports = userController;