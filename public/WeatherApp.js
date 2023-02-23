const weather = async (api) => {
    try {
        const res = await fetch(api);
        let data = await res.json();
        return data;
    } catch (err) {
        console.log(err.message);
    }
}

let url = "";

const lis = document.querySelectorAll("li");
const city = document.querySelector("h2");
const img = document.querySelector("img");
const tmp = document.querySelector("span");
const p = document.querySelector("div p");

const success = (pos) => {
    console.log("Location accessesed");
    console.log(pos.coords.latitude+":"+pos.coords.longitude);
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=62559d4942895a2f7cf43512737d0492`;
}

const error = (err) => {
    alert("unable to get the location"+err);
}

navigator.geolocation.getCurrentPosition(success,error);

document.querySelector("button").addEventListener("click", async () => {
    
    try {   
        const data = await weather(url);
        console.log(data);

        fill(data);
    } catch (err) {
        console.log(err.message);
    }

});


function fill(data){
    city.innerText = data.name;
    tmp.innerText = `${data.main.temp}° C`;
    p.innerText = `${data.weather[0].description}`;
    lis[0].innerText = `Humidity ${data.main.humidity}%`
    lis[1].innerText = `Wind Speed: ${data.wind.speed} m/s`
    img.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
}
