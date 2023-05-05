const express=require("express");
const mongoose=require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const homeRoutes = require("./routes/homeRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',homeRoutes);

mongoose.connect(process.env.CONNECTDB).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`listing port ${process.env.PORT}`)
    });
});
