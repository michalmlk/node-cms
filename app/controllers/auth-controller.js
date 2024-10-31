const User = require("../models/User");

class AuthController {
    async login(req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                throw new Error();
            } else {
                const isValidPassword = user.comparePassword(password);
                if (!isValidPassword) {
                    throw new Error();
                }
                req.session.user = req.body;
                res.status(201).redirect('/home');
            }
        } catch (e) {
            res.render('pages/login', {
                layout: 'layouts/unauthorized',
                form: req.body,
                hasError: true
            })
        }
    }

    logout(req, res) {
        req.session.destroy()
        res.redirect('/login');
    }
}


module.exports = new AuthController();