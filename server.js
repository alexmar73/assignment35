const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const fileupload = require("express-fileupload");
const path = require("path");

//loads environment variables
require('dotenv').config({path: "./config/keys.env"});

//imports router onjects
const generalController = require("./controllers/general");
const registrationController = require("./controllers/registration");
const productController = require("./controllers/product");
//const userController = require("./controllers/user");

//creates the app object
const app=express();

//MIDDLEWARE//
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));




//express session middleware
app.use(session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true
  }));

//custom middleware functions
app.use((req,res,next)=>{

    //res.locals.user is a global handlebars variable. This means that ever single handlebars file can access 
    //that user variable
    res.locals.user = req.session.userInfo;
    next();
});

//custom middleware functions
app.use((req,res,next)=>{

    if(req.query.method=="PUT")
    {
        req.method="PUT"
    }

    else if(req.query.method=="DELETE")
    {
        req.method="DELETE"
    }

    next();
})

//express-fileupload middleware
app.use(fileupload());

//mapping express to router objects
app.use("/", generalController);
app.use("/registration", registrationController);
app.use("/product", productController);
//app.use("/user", userController);
//MIDDLEWARE//

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to MongoDB Database`);
})
.catch(err=>console.log(`Error ocurred when connecting to database ${err}`));



//Creates an express web server
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Web Server is up and running`);
});