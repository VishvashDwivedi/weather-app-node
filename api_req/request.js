const chalk = require("chalk");
const geocode = require("./map_box");
const getweather = require("./open_weather_map");
const yargs = require("yargs");

// https://www.jqueryscript.net/animation/Confetti-Animation-jQuery-Canvas-Confetti-js.html
// https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidmlzaHdhcy0yNiIsImEiOiJja2FoOTVsajEwZTJvMnNveXg3eWQyeHgzIn0.rRSnn8spk4GT5t8pJTbQxQ&limit=1
// var s ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
chalk.green();

yargs.command({

    command:"city",
    builder:{
        city:{
            type:String,
            demandOption:true
        }
    },
    handler: (argv) => {

        geocode(argv.city,(err,data) => {

            if(err == undefined)
            {    
                getweather(data,(err,res) => {
                    
                    if(err === undefined){
                    
                        console.log("Temperature : ",res.temperature);
                        console.log("Location : ",res.location);
                    
                    }
                    else
                        console.log("Error : ",err);
                
                });
        
            }
            else
                console.log("Error : ",err);
        
        
        });

    }
});



const func = function(city,req1,res1,callback)
{
    geocode(city,(err,data) => {

        if(err == undefined)
        {    
            getweather(data,(err,res) => {
                
                if(err === undefined){
                
                    // console.log("Temperature : ",res.temperature);
                    // console.log("Location : ",res.location);
                    // return {
                    //     "Temperature":res.temperature,
                    //     "Location":res.location
                    // };
                    const data = {    "Temperature":res.temperature, "Location":res.location    };
                    callback(req1,res1,undefined,data);

                }
                else{
                    callback(req1,res1,err,undefined);
                    //console.log("Error : ",err);
                }
            });
    
        }
        else{
            callback(req1,res1,err,undefined);
            // console.log("Error : ",err);
        }
    
    });
    
}


module.exports = func;




// console.log(process.argv);

/*

request({ url:s,json:true } , (err,res) => {
    
    if(err)
        console.log(err);
    else if(res.toJSON().statusCode !== 200)
    {
        console.log("Not Found");
    }
    else
    {   
        console.log(res.toJSON().body.features[0].properties.mag);
        console.log(res.toJSON().body.features[0].properties.place);        
    }

});

*/