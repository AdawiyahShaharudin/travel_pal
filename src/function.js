const cityForm = document.querySelector("#weather");

const getWeatherConditions = async(city) => {

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`) //API
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
        let div = document.createElement("div");
        div.setAttribute("id", "conditions");

        let city = document.createElement("h2");
        let cityNode = document.createTextNode(data.name);
        city.appendChild(cityNode);

        let celsius = document.createElement("div"); 
        //convert Kelvin to Celsius
        let celsiusNode = document.createTextNode("\t🌡️ " + ((data.main.temp)-273.15).toFixed(2) + " °C "); 
        celsius.appendChild(celsiusNode);

        let icon = document.createElement("img");
        icon.setAttribute("src", `http://openweathermap.org/img/w/${data.weather[0].icon}.png`); //fetch icon from API
        icon.setAttribute("alt", data.weather[0].description);
        icon.style.display = "inline-block"; 
        icon.style.verticalAlign = "middle";
        icon.style.marginRight = "10px";

        let desc = document.createElement("div");
        let descNode = document.createTextNode("| " + data.weather[0].description);
        desc.appendChild(descNode);
        desc.style.display = "inline-block";
        desc.style.verticalAlign = "middle";

        let time = document.createElement("div");
        const date = new Date();
        const utcHours = date.getUTCHours();
        const utcMinutes = date.getUTCMinutes();
        //convert timezone to localtime
        const timezoneOffset = 3600; // in seconds
        const Hours = (utcHours + (timezoneOffset / 3600)) % 24;
        const Minutes = utcMinutes;
        const Time = new Date().toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Europe/Warsaw'});
        let timeNode = document.createTextNode(`It's currently ${Time} in  ${data.name}.`);
        time.appendChild(timeNode);
        
        // add line break
        const br = document.createElement("br");

        let sunset = document.createElement("div");
        //convert sunset to localtime
        const sunsetTime = new Date(data.sys.sunset * 1000);
        const sunsetTimeLocal = sunsetTime.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Europe/Warsaw'});
        let sunsetNode = document.createTextNode(`Enjoy the sunset 🌅 at ${sunsetTimeLocal}`);
        sunset.appendChild(sunsetNode);

        //append all data to div
        div.appendChild(city);
        div.appendChild(celsius);
        div.appendChild(icon);
        div.appendChild(desc);
        div.appendChild(time);
        div.appendChild(br);
        div.appendChild(sunset);
        document.querySelector("main").appendChild(div);
    }).catch(err => console.log(err))

}


document.addEventListener("DOMContentLoaded", (e) => {
    cityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if(document.querySelector("#city").value != ""){
            let conditionsDiv = document.querySelector("#conditions");
            if(conditionsDiv){
                document.querySelector("main").removeChild(conditionsDiv);
            }
            getWeatherConditions(document.getElementById("city").value); //get value from id=city
        }
        else{
            console.log("You must provide a city");
        }
    })
})

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml6 .letter',
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
  }).add({
    targets: '.ml6',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });
