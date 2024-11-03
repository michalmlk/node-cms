const Post = require('../models/post');

class PostController {
    async createPost(req, res) {
        try {
            const newPost = await Post.create({
                ...req.body, creatorId: req.session.user._id,
            });
            await newPost.save()
            res.status(201).redirect('/home');
        } catch (e) {
            res.render('pages/create-post', {
                layout: 'layouts/main', form: req.body, errors: Object.values(e.errors),
            })
        }
    }
}

//to make it work we need to export new instance of class
module.exports = new PostController();