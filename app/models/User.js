const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
    }
}, {
    methods: {
        comparePassword: function(password) {
            return bcrypt.compareSync(password, this.password);
        }
    }
})

schema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    } else {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
})

schema.post('save', (error, doc, next) => {
    if (error.code === 11000) {
        error.errors = {email: {message: 'Email already exist '}}
    }
    next(error)
})

const User = mongoose.model('User', schema);
module.exports = User;