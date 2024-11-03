const User = require("../models/User");

class UserController {

    async createUser(req, res) {
        try {
            const {email, password} = req.body;
            let avatarBase64 = null;

            if (req.file) {
                console.log('file')
                avatarBase64 = req.file.buffer.toString("base64");
            }

            const user = new User({
                email,
                password,
                avatar: avatarBase64,
            });

            await user.save();
            res.status(201).redirect('/home');
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