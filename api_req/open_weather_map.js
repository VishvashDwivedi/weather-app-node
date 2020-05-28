const request = require("request");

const getweather = (data,callback) => {

    // console.log(data);
    
    var url1 = "http://api.openweathermap.org/data/2.5/weather?" + `lat=${data.latitude}` + "&" + `lon=${data.longitude}` + "&appid=be9575da2c09c49fb8cfe3af184f5cc6";
    
    request({ url:url1,json:true } , (err,res) => {

        if(err)     callback("Unable to connect !",undefined);
        
        else if(res.body.error)     callback("Unable to find location !",undefined);
        else if(res.cod)    callback("Unable to find location !",undefined);        
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

// request({ url:url1,json:true } , (err,res) => {

//     if(err)     console.log(" Some error occured !!! ");
//     else if(res.body.error)
//         console.log("Unable to find location !!!");
//     else{
//         const data = res.body;
//         console.log(data.coord);

//         console.log(chalk.green("\n",data.main.temp-274.15,"deg. C\n"));
//     }

// });
