const Product = require("../../models/product.model")
module.exports.index = async (req,res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    });
    
    // console.log(products);
    // const newProduct = products.map((item,index)=>{
    //     return item.price*(100-item.discountPercentage);
    // })

    products.forEach(item => {
        item.priceNew = (item.price-(item.price*item.discountPercentage)/100).toFixed(0);
    });
    res.render("client/pages/product/productIndex.pug",{
        titlePage:"Trang san pham",
        products: products
    });
    
}
module.exports.detail = async (req, res) => {
    let find = {
        deleted: false,
        status : 'active',
        slug : req.params.slug
    }
    const product = await Product.findOne(find);

    res.render("client/pages/product/detail",{
        product: product
    });
}