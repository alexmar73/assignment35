const loggedInAsUsr = (req,res,next)=>{

    if(req.session.userInfo)
    {
        if(req.session.userInfo.role == "User")
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

module.exports = loggedInAsUsr;