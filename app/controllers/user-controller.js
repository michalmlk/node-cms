const User = require("../models/User");

class UserController {

    async createUser(req, res) {
        try {
            const user = await User.create({
                email: req.body.email,
                password: req.body.password,
            });
            await user.save();
            res.status(201).redirect('/');
            // }
        } catch (e) {
            res.render('pages/signup', {
                layout: 'layouts/unauthorized',
                errors: e.errors,
                form: req.body
            })
        }
    }
}

module.exports = new UserController();