const express = require('express');
const cors = require("cors");
const connectToDatabase = require('./config/database');
const path = require("node:path");
const ejsLayouts = require('express-ejs-layouts');
const PagesController = require("./controllers/pages-controller");
const PostController = require("./controllers/post-controller");
const UserController = require("./controllers/user-controller");
const AuthController = require("./controllers/auth-controller");

const app = express();

connectToDatabase();

app.use(express.urlencoded({
    extended: true,
}));
app.use(cors());
app.use(ejsLayouts);
app.use(express.static(path.join(__dirname, 'public')));

//view engine
app.set('view engine', 'ejs');
app.set('layout', path.join(__dirname, '../views/layouts/main'));
app.set('views', path.join(__dirname, './views'));

app.get('/', PagesController.renderHomepage);

app.get('/login', PagesController.renderLoginPage);
app.post('/login', AuthController.login);

app.get('/signup', PagesController.renderSignUpPage);
app.post('/signup', UserController.createUser);

app.get('/create-post', PagesController.renderCreatePostPage);
app.post('/create-post', PostController.createPost);

app.get('*', PagesController.renderNotFoundPage);

module.exports = app;
