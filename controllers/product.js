const express = require('express');
const router = express.Router();
const productsModel = require("../models/products");
const path = require("path");

//ROUTES
router.get("/add",(req,res)=>
{
    res.render("product/productAddForm");
});

router.post("/add", (req,res)=>
{
    
    const newProduct = {
        productName : req.body.productName,
        productPrice : req.body.productPrice,
        productDescription : req.body.productDescription,
        productCategory : req.body.productCategory,
        productQuantity : req.body.productQuantity,
        productBestseller : req.body.productBestseller
    }
    let mime = req.files.productPhoto.mimetype;

    if(mime == "image/png" || mime == "image/gif" || mime == "image/jpeg")
    {
    const product = new productsModel(newProduct);
    product.save()
    .then((product)=>{
        console.log("printing req body" + req.body);
        console.log("printing req files: " + req.files);
        req.files.productPhoto.name=`prod_pic_${product._id}${path.parse(req.files.productPhoto.name).ext}`;

        req.files.productPhoto.mv(`public/uploads/${req.files.productPhoto.name}`)
        .then(()=>{

            productsModel.updateOne({_id:product._id},{
                productPhoto: req.files.productPhoto.name
            })
            .then(()=>{
                res.render("product/productAddForm",
                {
                    success: "Product was succesfully added"
                });
            })
            

        })

        
    })
    .catch(err=>console.log(`Error when inserting into the database: ${err}`));
    }else
    {
        
        res.render("product/productAddForm",
        {
            error: "Uploaded file has wrong type. Please upload only png/jpeg/gif"
        });

    }
})

router.get("/list",(req,res)=>
{
    let allCategories=[];
    productsModel.find()
    .then((products)=>
    {
        const filteredProducts = products.map(product=>{
            allCategories.push(product.productCategory);
            return {
                _id: product._id,
                productName: product.productName
            }
        })
        res.render("product/productList",
        {
            products: filteredProducts,
            categories: allCategories
        });
    });
    
});


router.post("/list",(req,res)=>
{
    let allCategories=[];
    productsModel.find({}, {productCategory:1, _id:0}).then((products)=>{
        products.map(product=>{
            console.log(product.productCategory);
            allCategories.push(product.productCategory);
        })
        
    })
    console.log(req.body.category);
    category = req.body.category;
    if(category == "Please select")
    {
        productsModel.find()
        .then((products)=>
        {
            const filteredProducts = products.map(product=>{
                if(allCategories.length==0)
                {
                    allCategories.push(product.productCategory);
                }
               
               
                return {
                    _id: product._id,
                    productName: product.productName
                }
            })
            res.render("product/productList",
            {
                products: filteredProducts,
                categories: allCategories
            });
        });

    }else
    {
    productsModel.find({ "productCategory": category})
    .then((products)=>
    {
        const filteredProducts = products.map(product=>{
            console.log(product.productName);
            console.log(product.productCategory);
            return {
                _id: product._id,
                productName: product.productName
            }
        })
        let searchMessage ="";
        if(filteredProducts.length>0)
        {
            searchMessage+="Only showing products with category "+category;
        }
        else
        {
            searchMessage+="Could not find match for category "+category;
        }
        res.render("product/productList",
        {
            products: filteredProducts,
            categories: allCategories,
            message: searchMessage
        });
    });
    }
    
});
router.get("/edit/:id",(req,res)=>{

    productsModel.findById(req.params.id)
    .then((product)=>{

        const {_id,productName,productPrice,productDescription,productCategory,productQuantity,productBestseller,productPhoto} = product;
        let NoBestSeller = "";
        let bestSellerChecked = productBestseller? "Checked" : NoBestSeller += "Checked";
        
        res.render("product/productEditForm",{
            _id,
            productName,
            productPrice,
            productDescription,
            productCategory,
            productQuantity,
            bestSellerChecked,
            NoBestSeller,
            productPhoto
              
        })

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));


})


router.put("/update/:id",(req,res)=>{

    const product =
    {
        productName: req.body.productName,
        productPrice:req.body.productPrice,
        productDescription:req.body.productDescription,
        productCategory:req.body.productCategory,
        productQuantity:req.body.productQuantity,
        productBestseller:req.body.productBestseller,
       
    }

    productsModel.updateOne({_id:req.params.id},product)
    .then(()=>{
        res.redirect("/product/list");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));


});

router.delete("/delete/:id",(req,res)=>{
    
    productsModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/product/list");
    })
    .catch(err=>console.log(`Error happened when updating data from the database :${err}`));

});

module.exports=router;