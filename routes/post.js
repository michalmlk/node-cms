const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/posts', async (req, res) => {
    try {
        const allPosts = await Post.find();
        console.log(allPosts);
        // res.status(200).json(allPosts);
        res.render('home', { posts: allPosts });
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch posts.'});
    }
})

router.post('/create', async (req, res) => {
    try {
        const {title, content, creatorId} = req.body;
        const newPost = new Post({title, content, creatorId});
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({error: 'Failed to create post.'});
    }
})

module.exports = router;
