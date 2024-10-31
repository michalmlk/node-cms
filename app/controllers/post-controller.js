const Post = require('../models/post');

class PostController {

    async getPosts(req, res) {
        try {
            const allPosts = await Post.find({});
            res.render('home', {posts: allPosts});
        } catch (error) {
            res.status(500).json({error: 'Failed to fetch posts.'});
        }
    }

    async createPost(req, res) {
        try {
            const newPost = await Post.create({
                ...req.body,
                creatorId: '671e92eb13cd87fb4970c296',
            });
            await newPost.save()
            res.status(201).redirect('/home');
        } catch (e) {
            res.render('pages/create-post', {
                layout: 'layouts/main',
                form: req.body,
                errors: Object.values(e.errors),
            })
        }
    }
}

//to make it work we need to export new instance of class
module.exports = new PostController();