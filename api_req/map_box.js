const request = require("request");
require('dotenv').config();

const geocode = (city,callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ city +".json?access_token="+"pk.eyJ1IjoidmlzaHdhcy0yNiIsImEiOiJja2FoOTVsajEwZTJvMnNveXg3eWQyeHgzIn0.rRSnn8spk4GT5t8pJTbQxQ";

    request({ url:url,json:true },(err,res) => {

        if(err)     callback("Unable to connect !", undefined);

        else if(res.body.message || res.body.error || res.body.features.length === 0)
            callback("Location not found !",undefined);

        else{
                callback(undefined,{
                    latitude:res.body.features[0].center[1],
                    longitude:res.body.features[0].center[0],
                    location:res.body.features[0].place_name
                });
        
            }

    });

}

module.exports = geocode;





// var url2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidmlzaHdhcy0yNiIsImEiOiJja2FoOTVsajEwZTJvMnNveXg3eWQyeHgzIn0.rRSnn8spk4GT5t8pJTbQxQ";

// request({ url:url2,json:true  } , (err,res) => {


//     if(err)     console.log(" Some error occured !!!");
//     else if( res.body.features.length === 0)
//         console.log("This is not so good !!! \n");
//     else if(res.body.error)
//         console.log("Unable to find the latitude and longitute !!!\n")
//     else{
//         const lati = res.body.features[0].center[0];
//         const longi = res.body.features[0].center[1];

//         console.log(chalk.cyan("\n",lati," ",longi));

//     }

// });
