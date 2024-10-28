const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post-controller');

router.get('/posts', PostController.getPosts)

router.post('/create', PostController.createPost)

module.exports = router;
