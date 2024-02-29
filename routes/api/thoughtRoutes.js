// Imports
const router = require('express').Router();

// Controller imports
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// Routes for /api/thoughts
router.route('/')
    .get(getAllThoughts) // GET to retrieve all thoughts
    .post(createThought); // POST to create a new thought

// Routes for /api/thoughts/:id
router.route('/:id')
    .get(getThoughtById) // GET to retrieve a single thought by id
    .put(updateThought) // PUT to update a thought by id
    .delete(deleteThought); // DELETE to remove a thought by id

// Routes for /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction) // POST to create a reaction stored in thought's reactions array

// Route for /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction); // DELETE to remove a reaction by reactionId

// Export
module.exports = router;