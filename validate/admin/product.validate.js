module.exports.createPost = (req, res,next) => {
    if(!req.body.title){
        req.flash("error",`Vui lòng nhập lai trương này`);
        res.redirect('back');
        return;
    }
    // console.log("ok");
    next();

};