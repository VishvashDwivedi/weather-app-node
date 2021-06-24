const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const func = require("./api_req/request");
const PORT = process.env.PORT || 8080;
require('dotenv').config();


// for serving static pages(simple html,css,js) ... -> No Dynamic content
app.use("/css",express.static(path.join(__dirname,"/views/css")));
app.use("/img",express.static(path.join(__dirname,"/views/img")));
app.use("/js",express.static(path.join(__dirname,"/views/js")));


// Set the template engine ... It automatically searches for views folder in the
// current working directory...
app.set("view engine","hbs");


// By doing this we can specify the views folder name as templates or 
// provide it as path otherwise it searches for views in current directly.
// app.set("views","./temp");


// Registering partials path ( where they live )
// Partials are nothing but samples( html elements or code ) which remain common 
// throughout our website , like headers , footers , sidebars etc...

hbs.registerPartials(path.join(__dirname,"/partials/"));


// It renders the index.hbs from views folder
app.get("/",(req,res) => {

    // renders the specified content to the specified view...
    // index here signifies the view( index.hbs )
    res.render("index",{
        PageName:"Weather",
        foot:"Created by ~ Vishvash_Dwivedi"
    });

});


app.get("/about",(req,res) => {

    res.render("about",{
        PageName:"About",
        foot:"Created by ~ Vishvash_Dwivedi"
    });

});


app.get("/help",(req,res) => {

    res.render("help",{
        PageName:"Help",
        foot:"Created by ~ Vishvash_Dwivedi"
    });

});


app.get("/weather",(req,res) => {

    if( ! req.query.address)
        return res.send({   error:"Address must be true"    });

    func(req.query.address,req,res,(req,res,err,data) => {

        if(err === undefined)
            return res.send(data);

        res.send({
                _found:0,
                _place:req.query.address,
                _ERROR:err
            });

        });

});


app.get("/help/*",(req,res) =>{

    res.render("error",{
        PageName:"Help",
        foot:"Created by ~ Vishvash_Dwivedi",
        errmsg:"Help Not Found"

    });
});


app.get("/*",(req,res) => {

    res.render("error",{
        PageName:"Help",
        foot:"Created by ~ Vishvash_Dwivedi",
        errmsg:"Visit Help Section"
    });

});


app.listen(PORT, () => {
    console.log("Running...");
});