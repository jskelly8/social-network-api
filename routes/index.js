// Imports
const router = require('express').Router();
const apiRoutes = require('./api');

// Mounting routes under /api
router.use('/api', apiRoutes);

// Not found response for any other route requests
router.use((req, res) => res.send('Wrong route!'));

// Export
module.exports = router;