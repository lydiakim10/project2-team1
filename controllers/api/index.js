const router = require('express').Router();

const userRoutes = require('./userRoutes');
const budgetRoutes = require('./budgetRoutes');
const recordRoutes = require('./recordRoutes');

router.use('/user', userRoutes);
router.use('/budget', budgetRoutes);
router.use('/record', recordRoutes);

module.exports = router;