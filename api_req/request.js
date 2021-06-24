const geocode = require("./map_box");
const getweather = require("./open_weather_map");

// https://www.jqueryscript.net/animation/Confetti-Animation-jQuery-Canvas-Confetti-js.html
// https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidmlzaHdhcy0yNiIsImEiOiJja2FoOTVsajEwZTJvMnNveXg3eWQyeHgzIn0.rRSnn8spk4GT5t8pJTbQxQ&limit=1


const func = (city,req1,res1,callback) => {

    // fetches co-ordinates of the specified locations...
    geocode(city,(err,data) => {

        console.log("City : ",city);

        if(err)
            return callback(req1,res1,err,undefined);

        getweather(data,(err,res) => {
            
            if(err)
                return callback(req1,res1,err,undefined);

            const data = {
                "Temperature":res.temperature, 
                "Location":res.location    
            };
            callback(req1,res1,undefined,data);
    
        });
    
    
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