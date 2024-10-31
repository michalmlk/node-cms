const User = require("../models/User");

class AuthController {
    async login(req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                res.render('pages/login', {
                    layout: 'layouts/unauthorized',
                    form: req.body,
                    hasError: true
                })
            } else {
                const isValidPassword = user.comparePassword(password);
                if (!isValidPassword) {
                    res.render('pages/login', {
                        layout: 'layouts/unauthorized',
                        form: req.body,
                        hasError: true
                    })
                } else {
                    res.status(201).redirect('/');
                }
            }
        } catch (e) {
            res.render('pages/login', {
                layout: 'layouts/unauthorized',
                form: req.body,
                hasError: true
            })
        }
    }
}


module.exports = new AuthController();