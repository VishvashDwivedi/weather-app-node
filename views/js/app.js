// fetch("https://puzzle.mead.io/puzzle").then((res) => {
//     res.json().then((data) => {
//         console.log(data);
//     });
// });

const fun = (city) => {

    document.querySelector(".temp").innerHTML = "Loading...";
    if(city === '') {
        document.querySelector('.temp').innerHTML = 'Error : Please enter some value.';
        return ;
    }

    fetch(`/weather?address=${city}`)
    .then( (res) => {
        res.json().then( (data) => {

            console.log(data);
            if(!data.Temperature)
                document.querySelector(".temp").innerHTML = `Error : ${data._ERROR}`;

            else{
                // console.log(data.main.temp - 273.15,"deg C");
                document.querySelector(".temp").innerHTML = `Temperature : ${data.Temperature} deg C. <br><br> City : ${data.Location}`;

            }

        });

    });

}

const form = document.querySelector("form");
const search = document.querySelector("input");
form.addEventListener("submit",(e) => {

    e.preventDefault();
    const val = search.value;

    fun(val);

});
