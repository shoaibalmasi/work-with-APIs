$.ajax({
    type: "GET",
    //api to get all countries name
    url: "https://restcountries.eu/rest/v2/all",
    success: function (response) {
        response.forEach(elm => {
            $('#country').append(`<option id="${elm.name}">${elm.name}</option>`);
        });
        $('#country').change(function () {

            let selected = $(this).children('option:selected').attr('id');
            if (selected !== "empty") {
                $.ajax({
                    type: "GET",
                    //api to get selected country info
                    url: `https://restcountries.eu/rest/v2/name/${selected}`,
                    success: function (response) {
                        let res = response[0]
                        $('.info-child').css('display', 'block');
                        $('#contry-name').html(`${res.name}`);
                        $('#nativeName').html(`${res.nativeName}`);
                        $('#capital').html(`${res.capital}`);
                        $('#region').html(`${res.region}`);
                        $('#population').html(`${res.population}`);
                        $('#language').html(`${res.languages[0].name}`);
                        $('#timezone').html(`${res.timezones[0]}`);
                        $('#callCode').html(`${res.callingCodes[0]}`);
                        $('#contryFlag').css('display', 'block');
                        $('#contryFlag').attr('src', `${res.flag}`);
                        $('.call-child').css('display', 'block');
                        //google map function to show map
                        function initMap() {
                            let map = new google.maps.Map(document.getElementById('location'), {
                                center: {
                                    lat: res.latlng[0],
                                    lng: res.latlng[1]
                                },
                                zoom: 5
                            });
                        }
                        initMap();
                        $.ajax({
                            type: "GET",
                            //api to get weather info
                            url: `http://api.openweathermap.org/data/2.5/weather?q=${res.capital}&appid=c2982b419fdb43537af394be3ff48496`,
                            success: function (weatherRes) {
                                console.log(weatherRes);
                                $('#weather-child').css('visibility', 'visible');
                                $('.weather-icon').attr('src', `http://openweathermap.org/img/wn/${weatherRes.weather[0].icon}@2x.png`);
                                $('#weather-des').html(`${weatherRes.weather[0].description}`)
                                $('#wind-speed').html(`${weatherRes.wind.speed}`)
                                $('#temperature').html(`${weatherRes.main.temp}`)
                                $('#humidity').html(`${weatherRes.main.humidity}`)
                                $('#visibility').html(`${weatherRes.visibility}`)

                            }
                        });
                    }
                });
            }
        })
    }
});