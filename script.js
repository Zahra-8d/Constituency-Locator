
// function to get the user location on click of button

function getLocation() {
    var result = document.getElementById("result");
    if(!navigator.geolocation) {
        result.innerHTML="<p>Geolocation is not supported by your browser, please manually enter your location below</p>";
        //autocomplete box to enter location manually
        autoComplete();
        return;
    } else {
        result.innerHTML = "<p>Retrieving location...</p>";
        navigator.geolocation.getCurrentPosition(success, error);

    }

    //function for geolocation unsuccessfull
    function error() {
        result.innerHTML = "<p>Unable to retrieve location, please manually enter your location below</p>";
        //autocomplete box to enter location manually
        autoComplete();
    }

   //function for autocomplete box to enter location manually
    function autoComplete() {
        search = document.createElement("input");
        search.id = "locationField";
        var auto = new google.maps.places.Autocomplete(search);
        result.appendChild(search);
        //Check for manually input location and display map
        google.maps.event.addListener(auto, 'place_changed',
            function () {
                var place = auto.getPlace();
                var lat = place.geometry.location.lat();
                var long = place.geometry.location.lng();
                getPostcode(lat, long);
            }
        );
    }

    //function for geolocation successfull
    //gets the latitude and longitude
    //display an image of the google map location with a marker
    function success(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        getPostcode(lat, long);
    }

    // function to get the google map and corresponding postcode and constituency
    function getPostcode(lat,long) {
        result.innerHTML = "<p></p>";
        var map = new Image();
        map.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + long + "&zoom=13&size=400x400&markers=" + lat + "," + long;
        result.appendChild(map);

        postcode = document.createElement("div");
        postcode.id = "postcode";
        result.appendChild(postcode);
        $.get(encodeURI("https://api.postcodes.io/postcodes?lon=" + long + "&lat=" + lat))
            .done(function (data) {
                var pc = data.result[0].postcode;
                var constituency = data.result[0].parliamentary_constituency;
                postcode.innerHTML = "<p>Postcode: " + pc + "</p><p>Your constituency is: " + constituency + "</p>";
                

            })
            .fail(function (error) {
                postcode.innerHTML = "<p>Error: " + error + "</p>";
            });

    }

}

