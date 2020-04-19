const express = require('express');
const router = express.Router();
const usersModel = require("../models/user");
const loggedIn = require("../middleware/auth");


router.get("/userDashboard", loggedIn, (req,res)=>{

    res.render("user/userDashboard",{
        title: "Dashboard"
    });
});

router.get("/clerkDashboard", (req,res)=>{

    res.render("user/clerkDashboard",{
        title: "Dashboard"
    });
});

module.exports=router;