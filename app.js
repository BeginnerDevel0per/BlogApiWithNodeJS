var express = require("express");
var blogRoute = require("./Routes/blogRoute.js");
var bodyParser = require("body-parser");
var fileUpload = require("express-fileupload");
var cors = require('cors');
const port = 3000;

const app = express();



app.use(cors({
    origin: "*"
}));
app.use(express.static('public'));//public dosyasını erişilebilir yapıyoruz.
app.use(fileUpload());
app.use(bodyParser.json());
app.use("/", blogRoute);






app.listen(port, () => {
    console.log("3000 portundan dinleniyor.")
})