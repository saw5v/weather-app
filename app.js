window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");

    //bit of code I was experimenting with
    let iconInDOM = document.getElementsByClassName("material-icons");

    let temperatureSection = document.querySelector(".temperature")
    let temperatureSpan = document.querySelector(".degree-section span")

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;
                let APIKey = "44c78d7ece3a10dbd5d4ecd67023b97e"
                const api = `http://api.weatherapi.com/v1/current.json?key=8598af37cbb042d1b97173206221701&q=${long},${lat}&aqi=no`

                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        const {
                            country,
                            localtime,
                            name,
                            region
                        } = data.location
                        const {
                            text
                        } = data.current.condition
                        const {
                            temp_f,
                            temp_c,
                            icon

                        } = data.current
                        //Setting the DOM Elements
                        temperatureDegree.textContent = temp_f;
                        temperatureSpan.textContent = "F"
                        temperatureDescription.textContent = text
                        locationTimezone.textContent = `${name}, ${region}`;
                        console.log(temp_c)



                        //change temperature to Celsius/Fahrenheit
                        temperatureSection.addEventListener("click", () => {
                            if (temperatureSpan.textContent === "F") {
                                temperatureSpan.textContent = "C";
                                temperatureDegree.textContent = temp_c;
                            } else {
                                temperatureSpan.textContent = "F";
                                temperatureDegree.textContent = temp_f
                            }
                        });



                    });
            });


    }

});