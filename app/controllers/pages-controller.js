class PagesController {

    renderHomepage(req, res) {
        res.render('pages/home', {
            title: 'Home', layout: 'layouts/main'
        })
    }

    renderLoginPage(req, res) {
        res.render('pages/login', {
            title: 'Node-cms login', layout: 'layouts/unauthorized',
        })
    }

    renderSignUpPage(req, res) {
        res.render('pages/signup', {
            title: 'Node-cms signup', layout: 'layouts/unauthorized',
        })
    }

    renderNotFoundPage(req, res) {
        res.render('pages/not-found', {
            title: 'Page not found', layout: 'layouts/unauthorized',
        })
    }
}


module.exports = new PagesController();