const Post = require('../models/post');
const e = require("express");

class PostController {
    async createPost(req, res) {
        try {
            const newPost = await Post.create({
                ...req.body, creatorId: req.session.user._id,
            });
            await newPost.save()
            res.redirect('/home');
        } catch (e) {
            res.render('pages/create-post', {
                layout: 'layouts/main', form: req.body, errors: e.errors || {},
            })
        }
    }

    async deletePost(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (req.session.user._id.toString() === post.creatorId) {
                await Post.findByIdAndDelete(post._id)
                res.redirect('/home');
            }
        } catch (e) {
            throw e
        }
    }

    async editPost(req, res) {
        try {
            const post = await Post.findOne({_id: req.params.id});
            if (post.content !== req.body.content || post.title !== req.body.title) {
                post.content = req.body.content;
                post.title = req.body.title;
                await post.save();
                res.redirect('/home');
            } else {
                res.render('pages/edit-post', {
                    layout: 'layouts/main',
                    form: req.body,
                    errors: {form: {message: 'Nothing was edited'}},
                    postId: req.params.id
                })
            }
        } catch (e) {
            res.render('pages/edit-post', {
                layout: 'layouts/main',
                form: req.body,
                errors: Object.values(e.errors),
                postId: req.params.id
            })
        }
    }
}

//to make it work we need to export new instance of class
module.exports = new PostController();