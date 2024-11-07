const express = require('express');
const cors = require("cors");
const connectToDatabase = require('./config/database');
const path = require("node:path");
const ejsLayouts = require('express-ejs-layouts');
const PagesController = require("./controllers/pages-controller");
const PostController = require("./controllers/post-controller");
const UserController = require("./controllers/user-controller");
const AuthController = require("./controllers/auth-controller");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userMiddleWare = require('./middleware/user-mw');
const authMiddleware = require("./middleware/auth-mw");
const app = express();
const multer = require('multer');

connectToDatabase();
const upload = multer();

app.use(session({
    secret: process.env.SESSION_SECRET, saveUninitialized: true, cookie: {
        maxAge: 1000 * 60 * 60 * 24, //1 day
        resave: true,
    }
}));

app.use(express.urlencoded({
    extended: true,
}));
app.use(cors());
app.use(ejsLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(userMiddleWare);


//view engine
app.set('view engine', 'ejs');
app.set('layout', path.join(__dirname, '../views/layouts/main'));
app.set('views', path.join(__dirname, './views'));


app.get('/home', authMiddleware, PagesController.renderHomepage);

app.get('/login', PagesController.renderLoginPage);
app.post('/login', AuthController.login);
app.get('/logout', AuthController.logout);

app.get('/signup', PagesController.renderSignUpPage);
app.post('/signup', upload.single('avatar'), UserController.createUser);

app.get('/create-post', PagesController.renderCreatePostPage);
app.post('/create-post', PostController.createPost);

app.post('/delete-post/:id', PostController.deletePost);

app.get('*', PagesController.renderNotFoundPage);

module.exports = app;
