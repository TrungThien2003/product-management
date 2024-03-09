const dashboardRoute = require("./dashboard.route");
const systemConfig = require("../../config/system");
const productRoute = require("./product.route")

module.exports = (app) => {
    const pathAdmin = systemConfig.prefixAdmin;
    app.use(pathAdmin+"/dashboard",dashboardRoute);
    app.use(pathAdmin+"/product",productRoute);
}