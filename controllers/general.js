const express = require('express');
const router = express.Router();
const productModel = require("../models/product");
const categoriesModel = require("../models/categories");
const sellersModel = require("../models/sellers");
//const productsModel = require("../models/products"); //COME BACK TO ME


//ROUTES//
//HOME route
router.get("/",(req,res)=>{
   
    res.render("general/home",{
        title: "Home",
        categories :categoriesModel.getAllProducts(),
        sellers :sellersModel.getAllProducts()
    });

});

//PRODUCTS route
router.get("/products",(req,res)=>{

    res.render("general/products",{
        title: "Products",
        products :productModel.getAllProducts()
    });
   
});


//DASHBOARD route
router.get("/dashboard", (req,res)=>{

    res.render("general/dashboard",{
        title: "Dashboard"
    });
});
//ROUTES//

module.exports = router;