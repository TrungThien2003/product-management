const Product = require("../../models/product.model");
const filterStatusHelpers = require("../../helpers/statusFilter");
const searchHelper = require("../../helpers/search");
const paginationHelpers = require("../../helpers/pagination.js")
const systemConfig = require("../../config/system.js")
module.exports.indexProduct = async (req,res) => {
    console.log(req);
    let find = {
        deleted: false
    };
    const countProducts = await Product.estimatedDocumentCount(find);
// Tu tao ra cac trang thai cua san pham
    const filterStatus = filterStatusHelpers(req.query);
             
    const searchObject = searchHelper(req)

// Tim theo tu khoa
    if(req.query.status){
        find.status = req.query.status; 
    }
    if(searchObject.regex){
        find.title = searchObject.regex;
    }
            // let keyword ="";
            // if(req.query.keyword){
            //     keyword = req.query.keyword;
            //     const regex = new RegExp(keyword,"i");
            //     find.title = regex;
            // }
    // Phan trang cho website
    let objPagination = {
        currentPage: 1,
        limitItems : 4
    };
    paginationHelpers(objPagination,countProducts,req.query);
        // if(req.query.page){
        //     objPagination.currentPage = parseInt(req.query.page);
        // }
        // objPagination.skip = (objPagination.currentPage - 1) * objPagination.limitItems;
        // const countProducts = await Product.estimatedDocumentCount(find);
        // const totalPage = Math.ceil(countProducts/objPagination.limitItems);
        // objPagination.totalPage = totalPage;
        // console.log(totalPage);
    console.log(countProducts);
    const products = await Product.find(find).limit(objPagination.limitItems).skip(objPagination.skip);
        // console.log(products);
    res.render("admin/pages/product/index",{
        products: products,
        filterStatus: filterStatus,
        keyword: searchObject.keyword,
        pagination : objPagination
    });
}
//PATCH : /admin/product/change-status/:status/:id

module.exports.changeStatus = async (req,res) => {
    // res.send(`Hello Thie ${req.params.id} ${req.params.status}`)
    // console.log(req.params.id)
    // console.log(req.params.status)
    const status = req.params.status;
    const id = req.params.id;
    await Product.updateOne({_id : id},{status: status});
    req.flash("success","Cập nhật thành công");
    currentPage = parseInt(req.query.page);
    // res.send(typeof currentPage)
    res.redirect('back');
}

// PATCH : change multi products

module.exports.changeMulti = async (req,res) => {
    console.log(req.body);
    const type = req.body.type;
    // console.log(req.boy.type)
    const ids = req.body.ids.split(",");
    switch(type){
        case "active":
            await Product.updateMany({_id: {$in: ids}}, {status: "active"});
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status: "inactive"});
            break;
        case "delete-all":
            await Product.updateMany({_id: {$in : ids}},{deleted: true});
            break;
        case "change-position":
            for(const item of ids){
                let [id,position] = item.split("-");
                const newPos = parseInt(position);
                await Product.updateOne({_id: id},{position: newPos});
            }
            break;
    }
    res.redirect('back');
}
module.exports.deleteItem = async (req,res) => {
    const id = req.params.id;
    await Product.deleteOne({_id : id});
    res.redirect('back');
}
module.exports.createProduct = async (req,res) => {
    res.render("admin/pages/product/create",{
        titlePage: "Thêm mới sản phẩm"
    });
}
module.exports.createPost = async (req,res) => {
    
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position == ""){
        const countProduct = await Product.countDocuments();
        req.body.position = countProduct + 1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }
    req.body.thumbnail = `/uploads/${req.file.filename}`;
    // console.log(req.body)
    const product = new Product(req.body);
    await product.save();
    res.redirect(`${systemConfig.prefixAdmin}/product`);

}

module.exports.edit = async (req, res) => {
    // res.send("Hello world");
    
    let find ={
        deleted: false,
        _id : req.params.id
    }
    const product = await Product.findOne(find);
    // console.log(product);
    res.render("admin/pages/product/edit",{
        product: product
    });
    
}

module.exports.editPatch = async (req, res) => {
    // console.log(req.body);
    // res.send("elool");
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.position = parseInt(req.body.position)
    if(req.file){
        req.body.thumbnail = `uploads/${req.file.filename}`;
    }
    try{
        await Product.updateOne({_id: id }, req.body);
        req.flash("success", "Cập nhật thành công")
    } catch(error){
      req.flash("error","Cập nhật thất bại")
    }
    res.redirect('back');
}

module.exports.detail = async (req, res) => {
    // res.send("hello Thiện nè ");
    try{
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find);
        res.render("admin/pages/product/detail",{
            product: product
        })

    } catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/product`);

    }
}