console.log("jghb");

const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const func = require("./api_req/request"); 


console.log(__dirname);
// const filepath = path.join(__dirname,"/htmls/");



// for static pages ... -> No Dynamic content
app.use("/css",express.static(path.join(__dirname,"/views/css")));
app.use("/img",express.static(path.join(__dirname,"/views/imgs")));
app.use("/js",express.static(path.join(__dirname,"/views/js")));



// Set the template engine ... automatically searches for views folder in the
// project directory...
app.set("view engine","hbs");


// By doing this we can specify the views folder name as tempelates or provide it as path
// app.set("views","./temp");


// Registering partials
hbs.registerPartials(path.join(__dirname,"/partials/"));


// It renders the index.hbs from views folder 
app.get("/",(req,res) => {

    res.render("index",{
        PageName:"Weather",
        foot:"Created by ~ #V_W",
        abc:"Dhan Te Naan",
    });

});


app.get("/about",(req,res) => {

    res.render("about",{
        PageName:"About",
        foot:"Created by ~ #V_W",
    });

});


app.get("/help",(req,res) => {

    res.render("help",{
        PageName:"Help",
        foot:"Created by ~ #V_W",
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
        foot:"Created by ~ #V_W",
        errmsg:"Help Not Found"

    });
});


app.get("/*",(req,res) => {
    
    res.render("error",{
        PageName:"Help",
        foot:"Created by ~ #V_W",
        errmsg:"Visit Help Section"
    });

});



app.listen(8080, () => {
    console.log("Running...");
});
