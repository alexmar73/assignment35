const express = require('express');
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const isAuthenticated = require("../middleware/auth")
const isAuthenticatedAsUsr = require("../middleware/authUser")
//ROUTES//
//REGISTRATION route
router.get("/",(req,res)=>{
    console.log(process.env.SEND_GRID_KEY);
    res.render("registration/registration",{
        title: "Registration"
    });

});




//Handle when a user submits registration form
router.post("/",(req,res)=>{

    const fnError=[];
    const lnError=[];
    const emError=[];
    const pwError1=[];
    const pwError2=[];
 
 
 
     if(req.body.firstName == "")
     {
         fnError.push("Enter your First Name");
     }
 
     if(req.body.lastName == "")
     {
         lnError.push("Enter your last name");
     }
 
     if(req.body.username == "")
     {
         emError.push("Enter your email");
     }
    
 
 
     const pwLength = req.body.password.length;
     console.log(pwLength); 
 
     if( req.body.password == "")
     {
         pwError1.push("Enter your password");
     }
     else if(pwLength> 0 && (pwLength < 6 || pwLength > 12))
      {
          console.log(`inside`);
          pwError2.push("Password must have at least 6 characters but no more than 12");
          console.log(pwError2);
      }
     
 
     if(fnError.length > 0 || lnError.length > 0 || emError.length > 0 || pwError1.length > 0 || pwError2.length > 0)
 
     {
         console.log(`inside 2`);
         console.log(fnError);
         console.log(lnError);
         console.log(emError);
         console.log(pwError1);
         console.log(pwError2);
 
         res.render("registration/registration",{
             //errors: errMsg
             errorFN: fnError,
             errorLN: lnError,
             errorEM: emError,
             errorPW1: pwError1,
             errorPW2: pwError2,
             pwd : req.body.password
         })
     
     }
     else

{



    const newUser = 
    {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role
    }
    let user1;
    let errors=[];
    userModel.findOne({email: req.body.email})
    .then(user=>{
        
        console.log(user);
        if(user == null)
        {
            console.log("went inside user null");
            user1 = new userModel(newUser);
            user1.save()
            .then((user1)=>{

                req.session.userInfo = user1;
                
                const {firstName,lastName,email, password} =req.body;

                const sgMail = require('@sendgrid/mail');
                sgMail.setApiKey(process.env.SEND_GRID_KEY);
                const msg = 
                {
                    to: `alexandra.martin73@gmail.com`,
                    from: `${email}`,
                    subject: `${firstName} Welcome to ShopWell!`,
                    text: `You're almost there! Please confirm your email address. By clicking on the following link, you are confirming your email address.`,
                    html: `You're there! <br>Please confirm your email address. <br> <br> By clicking on the following link, you are confirming your email address.`,
                };
                sgMail.send(msg)
                .then(()=>{
                    if(req.body.role == "Clerk")
                {
                    res.redirect("/registration/clerkDashboard");
                }
                else if(req.body.role == "User")
                {
                    res.redirect("/registration/userDashboard");
                }
               
                
                //res.redirect("/dashboard");
                })
                .catch(err=>
                {
                    console.log(`Error ${err}`);
                })


            })
            .catch(err=>console.log(`Error ocurred while inserting into the data ${err}`));
        }
        else 
        {
            console.log("outside user null");
            errors.push("This email already exists. Please use another email.");
            res.render("registration/registration",
            {
                errors1: errors
            });
        }
        console.log(errors);
    }).catch(err=>
        {
            console.log(`Error ocurred while checking if user exists in db ${err}`);
            errors.push(err);
            res.render("registration/registration",
            {
                errors1: errors
            });
        });
    //console.log("user1 outside db stuff"+ user1);
}  
   
    


});



//LOGIN route
router.get("/login",(req,res)=>{
    res.render("registration/login",{
        title: "Login"
    });
});

//Handle when a user submits login info
router.post("/login",(req,res)=>{
    console.log(`I am inside`);
    console.log(`${req.body.email}`);
    //console.log(req.body);
    //res.render(); 
    userModel.findOne({email: req.body.email})
    .then(user=>{
        const errors=[];

        if(user == null)
        {
           console.log(`Error ${email}`);
            errors.push("Email and/or password is invalid");
            res.render("registration/login",{
                errors : errors
            })
        }

        //if the email is found
        else
        {
            
            bcrypt.compare(req.body.password, user.password)
            .then(isMatchy=>{
                
                if(isMatchy)
                {
                   
                    req.session.userInfo = user;
                    if(user.role == "Clerk")
                    {
                        res.redirect("/registration/clerkDashboard");
                    }
                    else
                    {
                        res.redirect("/registration/userDashboard");
                    }
                    
                }
                else
                {
                    errors.push("Email and or password is invalid");
                    res.render("registration/login",{
                    errors : errors
                    })
                }
            })
            .catch(err=>console.log(`Password match error ${err}`));
        }
    })
    .catch(err=>console.log(`Email Login Error ${err}`));
});


router.get("/profile",(req,res)=>{

    if(user.role == "Clerk")
    {
        res.redirect("registration/clerkDashboard");
    }
    else
    {
        res.redirect("registration/userDashboard");
    }
    //res.render("/dashboard");
    
});

router.get("/logout",(req,res)=>{
    console.log("inside logout get");
    //req.session.destroy();
    res.redirect("/registration/login")
});

router.post("/logout",(req,res)=>{
    console.log("inside logout post");
    req.session.destroy();
    res.redirect("/registration/login")
});
//ROUTES//


router.get("/userDashboard",isAuthenticatedAsUsr,(req,res)=>{

    res.render("registration/userDashboard",{
        title: "Dashboard"
    });
});

router.get("/clerkDashboard",isAuthenticated, (req,res)=>{

    res.render("registration/clerkDashboard",{
        title: "Dashboard"
    });
});

module.exports = router;
