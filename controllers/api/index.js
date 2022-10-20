const router = require('express').Router();

const userRoutes = require('./userRoutes');
const budgetRoutes = require('./budgetRoutes');
const recordRoutes = require('./recordRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use('/user', userRoutes);
router.use('/budget', budgetRoutes);
router.use('/record', recordRoutes);
router.use('/category', categoryRoutes);

module.exports = router;