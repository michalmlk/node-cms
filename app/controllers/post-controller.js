const Post = require('../models/post');

class PostController {

    async getPosts(req, res) {
        try {
            const allPosts = await Post.find();
            res.render('home', {posts: allPosts});
        } catch (error) {
            res.status(500).json({error: 'Failed to fetch posts.'});
        }
    }

    async createPost(req, res) {
        try {
            const {title, content, creatorId} = req.body;
            const newPost = new Post({title, content, creatorId});
            await newPost.save();
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({error: 'Failed to create post.'});
        }
    }
}

//to make it work we need to export new instance of class
module.exports = new PostController();