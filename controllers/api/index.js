const router = require('express').Router();

const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const recordRoutes = require('./recordRoutes');

router.use('/user', userRoutes);
router.use('/category', categoryRoutes);
router.use('/record', recordRoutes);

module.exports = router;