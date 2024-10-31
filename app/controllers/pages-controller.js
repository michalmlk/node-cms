const Post = require('../models/post');

class PagesController {

    async renderHomepage(req, res) {
        const allPosts = await Post.find({})

        res.render('pages/home', {
            title: 'Home', layout: 'layouts/main', data: allPosts
        })
    }

    renderLoginPage(req, res) {
        res.render('pages/login', {
            title: 'Node-cms login', layout: 'layouts/unauthorized', form: {
                email: '',
                password: ''
            }, hasError: false
        })
    }

    renderSignUpPage(req, res) {
        res.render('pages/signup', {
            title: 'Node-cms signup', layout: 'layouts/unauthorized', form: {
                email: '', password: ''
            },
            errors: {}
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
}


module.exports = new PagesController();