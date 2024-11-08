const Post = require('../models/post');
const User = require('../models/user');
const {ObjectId} = require('mongoose').Types;

class PagesController {
    renderLoginPage(req, res) {
        res.render('pages/login', {
            title: 'Node-cms login', layout: 'layouts/unauthorized', form: {
                email: '', password: ''
            }, hasError: false
        })
    }

    renderSignUpPage(req, res) {
        res.render('pages/signup', {
            title: 'Node-cms signup', layout: 'layouts/unauthorized', form: {
                email: '', password: '', avatar: undefined
            }, errors: {}
        })
    }

    async renderHomepage(req, res) {
        const allPosts = await Post.find({})
        const users = await User.find({})
        const data = allPosts.map((post) => ({
            ...post._doc,
            user: users.find(u => u._id.toString() === post.creatorId)
        }))

        res.render('pages/home', {
            title: 'Home', layout: 'layouts/main', data: data, currentUser: req.session.user
        })
    }

    renderNotFoundPage(req, res) {
        res.render('pages/not-found', {
            title: 'Page not found', layout: 'layouts/unauthorized',
        })
    }

    renderCreatePostPage(req, res) {
        res.render('pages/create-post', {
            title: 'Create post', layout: 'layouts/main', errors: [], form: req.body
        })
    }

    async renderEditPostPage(req, res) {
        const {id} = req.params;

        if (!ObjectId.isValid(id)) {
            res.redirect('/home');
        } else {
            const post = await Post.findById(id);
            res.render('pages/edit-post', {
                title: 'Edit post', layout: 'layouts/main', errors: {}, form: post, postId: id
            })
        }
    }
}


module.exports = new PagesController();