module.exports.dashboard = (req,res) => {
    //mặc đinh di vao thu muc views
    res.render("admin/pages/dashboard/indexDashboard.pug",{
        titlePage: "Trang tổng quan"
    });
}