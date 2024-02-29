// Imports
const router = require('express').Router();

// Controller imports
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// Routes for /api/users
router.route('/')
    .get(getAllUsers) // GET all users
    .post(createUser); // POST a new user

// Routes for /api/users/:id
router.route('/:id')
    .get(getUserById) // GET a single user by id
    .put(updateUser) // PUT to update a user by id
    .delete(deleteUser); // DELETE to remove a user by id

// Routes for /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend) // POST to add a new friend to a user's friend list
    .delete(removeFriend); // DELETE to remove a friend from a user's friend list

// Export
module.exports = router;