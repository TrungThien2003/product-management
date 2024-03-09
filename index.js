const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser")
const flash = require("express-flash")
const cookieParser = require("cookie-parser");
const session = require("express-session");

require("dotenv").config();
const app = express();
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser("keyboardcat"));
app.use(session({cookie: {maxAge: 60000}}));
app.use(flash());
const systemConfig = require("./config/system");
//nen de duong dan den database trong env
const connection = require("./config/connect-to-database.js");
connection.connect();


const port = process.env.PORT;
app.set("view engine","pug");
app.set("views",`${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
const routAdmin = require("./router/admin/index.route.js");
const route = require("./router/client/index.route.js");
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes
route(app);
routAdmin(app);

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});