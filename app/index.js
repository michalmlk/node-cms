const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDatabase = require('./config/database');
const authenticationRoutes = require('./routes/authentication');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const path = require("node:path");
const ejsLayouts = require('express-ejs-layouts');
const PagesController = require("./controllers/pages-controller");

const app = express();

connectToDatabase();

app.use(bodyParser.json());
app.use(cors());
app.use(ejsLayouts);
app.use('/api/auth', authenticationRoutes);
app.use('/api/post', postRoutes)
app.use('/api/user', userRoutes)
app.use(express.static(path.join(__dirname, 'public')));

//view engine
app.set('view engine', 'ejs');
app.set('layout', path.join(__dirname, '../views/layouts/main'));
app.set('views', path.join(__dirname, './views'));

app.get('/', PagesController.renderHomepage);

app.get('/login', PagesController.renderLoginPage);

app.get('/signup', PagesController.renderSignUpPage);

app.get('*', PagesController.renderNotFoundPage);

module.exports = app;
