const express = require('express');
const bodyParser = require("body-parser");
const chalk = require("chalk");
const cors = require("cors");
const PORT = 3000;
const connectToDatabase = require('./config/database');
const authenticationRoutes = require('./routes/authentication');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const path = require("node:path");
const ejsLayouts = require('express-ejs-layouts');

const app = express();

connectToDatabase();

app.use(bodyParser.json());
app.use(cors());
app.use(ejsLayouts);
app.use('/api/auth', authenticationRoutes);
app.use('/api/post', postRoutes)
app.use('/api/user', userRoutes)

//view engine
app.set('view engine', 'ejs');
app.set('layout', path.join(__dirname, '/views/layouts/main'));
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('pages/home', {
        title: 'Home',
        layout: 'layouts/main'
    });
})

app.get('/login', (req, res) => {
    res.render('pages/login', {
        title: 'Node-cms login',
        layout: 'layouts/unauthorized',
    })
})

app.get('/signup', (req, res) => {
    res.render('pages/signup', {
        title: 'Node-cms signup',
        layout: 'layouts/unauthorized',
    })
})

app.get('*', (req, res) => {
    res.render('pages/not-found', {
        title: 'Page not found',
        layout: 'layouts/unauthorized',
    })
})


app.listen(PORT, () => {
    console.log(chalk.black.bold.bgGreen(`     Server started on port ${PORT} ⚡️     `));
})