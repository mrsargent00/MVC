const router = require('express').Router();

const userRoutes = require('./UserRoutes.js');
const postRoutes = require('./PostRoutes.js');
const commentRoutes = require('./CommentRoutes.js');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes)

module.exports = router;