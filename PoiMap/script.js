﻿var geocoder;
var map;
var markers = Array();
var infos = Array();

function initialize() {
    // prepare Geocoder
    geocoder = new google.maps.Geocoder();

    // set initial position (New York)
    var myLatlng = new google.maps.LatLng(40.7143528, -74.0059731);

    var myOptions = { // default map options
        zoom: 14,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
}

// clear overlays function
function clearOverlays() {
    if (markers) {
        for (i in markers) {
            markers[i].setMap(null);
        }
        markers = [];
        infos = [];
    }
}

// clear infos function
function clearInfos() {
    if (infos) {
        for (i in infos) {
            if (infos[i].getMap()) {
                infos[i].close();
            }
        }
    }
}

// find address function
function findAddress() {
    var address = document.getElementById("gmap_where").value;

    // script uses our 'geocoder' in order to find location by address name
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) { // and, if everything is ok

            // we will center map
            var addrLocation = results[0].geometry.location;
            map.setCenter(addrLocation);

            // store current coordinates into hidden variables
            document.getElementById('lat').value = results[0].geometry.location.lat();
            document.getElementById('lng').value = results[0].geometry.location.lng();

            // and then - add new custom marker
            var addrMarker = new google.maps.Marker({
                position: addrLocation,
                map: map,
                title: results[0].formatted_address,
                icon: 'marker.png'
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// find custom places function

function findPlaces() {

    // prepare variables (filter)
    var type = document.getElementById('gmap_type').value;
    //var type = '';
    var radius = document.getElementById('gmap_radius').value;
    var keyword = document.getElementById('gmap_keyword').value;

    var lat = document.getElementById('lat').value;
    var lng = document.getElementById('lng').value;
    var cur_location = new google.maps.LatLng(lat, lng);

    // prepare request to Places
    var request = {
        location: cur_location,
        radius: radius,
        types: [type]
        //language: 'ar'

    };

    if (keyword) {
        request.keyword = [keyword];
    }


    // send request
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, createMarkers);

}
// create markers (from 'findPlaces' function)
function createMarkers(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

        // if we have found something - clear map (overlays)
        clearOverlays();

        // and create new markers by search result
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        alert('Sorry, nothing is found');
    }
}

function saveData()
{ }

// creare single marker function
function createMarker(obj) {

    var photos = obj.photos;

    var infocontent = "<table style='width:400px;'>" +
           "<tr><td>Name:</td> <td><input type='text' id='name'/> </td> </tr>" +
           "<tr><td>Address:</td> <td><input type='text' id='address'/></td> </tr>" +
           "<tr><td>Address:</td> <td><input type='text' id='address'/></td> </tr>" +
           "<tr><td>Address:</td> <td><input type='text' id='address'/></td> </tr>" +
           "<tr><td>Address:</td> <td><input type='text' id='address'/></td> </tr>" +
           "<tr><td>Address:</td> <td><input type='text' id='address'/></td> </tr>" +
           "<tr><td>Address:</td> <td><input type='text' id='address'/></td> </tr>" +
           "<tr><td>Address:</td> <td><input type='text' id='address'/></td> </tr>" +
           "<tr><td>Address:</td> <td><input type='text' id='address'/></td> </tr>" +
           "<tr><td>Address:</td> <td><input type='text' id='address' style='width:250px;'/></td> </tr>" +
           "<tr><td>Address:</td> <td><input type='text' id='address' style='width:280px;'/></td> </tr>" +
           "<tr><td>Address:</td> <td><input type='text' id='address' /></td> </tr>" +
           "<tr><td>Type:</td> <td><select id='type'>" +
           "<option value='bar' SELECTED>bar</option>" +
           "<option value='restaurant'>restaurant</option>" +
           "</select> </td></tr>" +
           "<tr><td></td><td><input type='button' value='Save & Close' onclick='saveData()'/></td></tr>";


    if (!photos) {
        // prepare new Marker object
        var mark = new google.maps.Marker({
            position: obj.geometry.location,
            map: map,
            title: obj.name
        });

        markers.push(mark);

        // prepare info window
        //var infowindow = new google.maps.InfoWindow({
        //    content: '<img src="' + obj.icon + '" /><font style="color:#000;">' + obj.name +
        //    '<br />Rating: ' + obj.rating + '<br />Address: ' + obj.vicinity + '</font>' +
        //    '<br />Web site: ' + obj.getUrl
        //});

        var infowindow = new google.maps.InfoWindow({
            content: infocontent
        });
    }
    else {
        var ss = photos[0].getUrl({ 'maxWidth': 100, 'maxHeight': 70 })
        //ss = 'https://media.giphy.com/media/7wwyuF7GfTD0I/giphy.gif'
        // prepare new Marker object
        var mark = new google.maps.Marker({
            position: obj.geometry.location,
            map: map,
            draggable: false,
            optimized: false, // <-- required for animated gif
            animation: google.maps.Animation.DROP,
            title: obj.name,
            icon: ss
        });

        markers.push(mark);

        // prepare info window

        var infowindow = new google.maps.InfoWindow({
            content: infocontent
        });
    }

    // add event handler to current marker
    google.maps.event.addListener(mark, 'click', function () {
        clearInfos();
        infowindow.open(map, mark);
    });
    infos.push(infowindow);
}

// initialization
google.maps.event.addDomListener(window, 'load', initialize);