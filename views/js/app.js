console.log("Herooo !");
// fetch("https://puzzle.mead.io/puzzle").then((res) => {
//     res.json().then((data) => {
//         console.log(data);
//     });
// });


const fun = (city) => {

    document.querySelector(".temp").innerHTML = "Loading...";

    // fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=be9575da2c09c49fb8cfe3af184f5cc6");
    fetch(`http://localhost:8080/weather?address=${city}`)
    .then( (res) => {
        res.json().then( (data) => {
            
             console.log(data);
            if(!data.Temperature)    document.querySelector(".temp").innerHTML = `Error : ${data._ERROR}`;
            else{
                // console.log(data.main.temp - 273.15,"deg C");
                document.querySelector(".temp").innerHTML = `Temperature : ${data.Temperature} deg C. <br> City : ${data.Location}`;

            }
             
        });
    });


}

const form = document.querySelector("form");
const search = document.querySelector("input");
form.addEventListener("submit",(e) => {

    e.preventDefault();
    const loc = search.value;

    fun(loc);
    // console.log(loc);
});
