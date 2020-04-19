const loggedIn = (req,res,next)=>{

    if(req.session.userInfo)
    {
        if(req.session.userInfo.role == "Clerk")
        {
            next();
        }
        else
        {
            res.redirect("/registration/login");
        }
        
    }
    else
    {
        res.redirect("/registration/login");
    }
}

module.exports = loggedIn;