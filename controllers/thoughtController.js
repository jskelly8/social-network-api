// Imports
const { Thought, User } = require('../models');

const thoughtController = {
  // GET to retrieve all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find({})
        .select('-__v')
        .sort({ _id: -1 });

      res.status(200).json(thoughtData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // GET to retrieve a single thought by id
  async getThoughtById(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.id })
        .select('-__v');

      if (!thoughtData) {
        res.status(404).json({ message: 'No thought found' });
        return;
      }

      res.status(200).json(thoughtData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // POST to create a new thought
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
      const userData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );

      if (!userData) {
        res.status(404).json({ message: 'No user found' });
        return;
      }

      res.status(200).json(thoughtData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // PUT to update a thought by id
  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!thoughtData) {
        res.status(404).json({ message: 'No thought found' });
        return;
      }

      res.status(200).json(thoughtData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // DELETE to remove a thought by id
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndDelete({ _id: req.params.id });

      if (!thoughtData) {
        res.status(404).json({ message: 'No thought found' });
        return;
      }

      res.status(200).json({ message: 'Thought deleted successfully!' });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // POST to create a reaction stored in thought's reactions array
  async addReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );

      if (!thoughtData) {
        res.status(404).json({ message: 'No thought found' });
        return;
      }

      res.status(200).json(thoughtData, { message: 'Reaction deleted successfully!' });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // DELETE to remove a reaction by reactionId
  async removeReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true, runValidators: true }
      );

      if (!thoughtData) {
        res.status(404).json({ message: 'No thought or reaction found' });
        return;
      }

      res.status(200).json(thoughtData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

// Export
module.exports = thoughtController;