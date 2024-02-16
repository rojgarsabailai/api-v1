require("dotenv").config();

const express = require("express");
const app = express();
const session = require('express-session');
const mongoDBStore = require("connect-mongodb-session")(session);
const connectDB = require("./database/connection/connectDB");
const auth = require("./routes/authRoutes");
const path = require("path");
const port = process.env.PORT || 5500;
app.set('view engine', 'ejs');

// Serve static files from the public directory

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
connectDB().then(()=>{
    console.log("connected to database");
}).catch((error)=>{
    console.log(error)
});

//creating the session store
const store = new mongoDBStore({
    uri:process.env.MONGO_URI,
    collection:'sessions',
});
if(store){
    console.log("store for session initiated successfully");
    app.use(session({
        secret: process.env.SESSIONKEY,
        resave: false,
        saveUninitialized: false,
        store:store,
    }));
}

// Set up session middleware






app.get('/', (request, response) => {
    console.log(path.join(__dirname,'views', 'index'));
    response.render(path.join(__dirname,'views', 'index'));
});
app.use("/rojgar",auth);
app.listen(port,()=>{
    console.log(`connected to port ${port}`);
});