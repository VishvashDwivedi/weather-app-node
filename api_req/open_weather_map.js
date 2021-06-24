const request = require("request");
require('dotenv').config();

const getweather = (data,callback) => {
    // be9575da2c09c49fb8cfe3af184f5cc6
    var url1 = "http://api.openweathermap.org/data/2.5/weather?" + `lat=${data.latitude}` + "&" + `lon=${data.longitude}` + `&appid=${process.env.API_ID1}`;

    request({ url:url1,json:true } , (err,res) => {

        if(err)     callback("Unable to connect !",undefined);

        else if(res.body.error || res.cod)     callback("Unable to find location !",undefined);

        else{
            callback(undefined,{
                "temperature":res.body.main.temp-273.15,
                "location":data.location
            });
        }

    });

}

module.exports = getweather;





// var url1 = "http://api.openweathermap.org/data/2.5/weather?lat=26.47&lon=80.35&appid=be9575da2c09c49fb8cfe3af184f5cc6";