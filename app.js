require("dotenv").config();

const express = require("express");
const app = express();
const session = require('express-session');

// Set up session middleware
app.use(session({
    secret: process.env.SESSIONKEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3600000 // 1 hour
    }
}));

const path = require("path");

app.set('view engine', 'ejs');

// Serve static files from the public directory

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 5500;

const connectDB = require("./database/connection/connectDB");

const auth = require("./routes/authRoutes");

app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

app.use("/rojgar",auth);

app.get('/', (request, response) => {
    response.render('index', {foo: 'FOO'});
});

app.listen(port,()=>{
    connectDB();
    console.log(`connected to port ${port}`);

});