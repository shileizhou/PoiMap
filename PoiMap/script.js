var geocoder;
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
        //key: 'AIzaSyBEmSuFeHW0LS6o8fEBH7uVo9AK3qw63ok'
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
            getLocDetails(results[i]);
        }
    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        alert('Sorry, nothing is found');
    }
}

function saveData()
{
        var vPlaceid = $("#PlaceId").val()
        var vPlaceName = $("#PlaceName").val()
        var vAddress = $("#Address").val()
        var vCountry = $("#Country").val()
        var vDescription = $("#Description").val()
        var vLongtitude = $("#Longtitude").val()
        var vLatitude = $("#Latitude").val()
        var vAltitude = $("#Altitude").val()
        var vIcon = $("#Icon").val()
        var vMainPhoto = $("#MainPhoto").val()
        var vVideo = $("#Video").val()
        var vWiki = $("#Wiki").val()
        var vARName = $("#ARName").val()
        var vARPhoto = $("#ARPhoto").val()
        var vWebsite = $("#Website").val()

        var poi = {
            Placeid: vPlaceid,
            Placename: vPlaceName,
            Address: vAddress,
            Country: vCountry,
            Description: vDescription,
            Longtitude: vLongtitude,
            Latitude: vLatitude,
            Altitude: vAltitude,
            Icon: vIcon,
            MainPhoto: vMainPhoto,
            Video: vVideo,
            Wiki: vWiki,
            ARName: vARName,
            ARPhoto: vARPhoto,
            Website: vWebsite,
            };

        $.ajax({
            type: "POST",
            data: JSON.stringify(poi),
            datatype: "text",
            url: "api/Pois",
            contentType: "application/json",
            success: function (result) {
                alert(result); // result is an object which is created from the returned JSON
            }
        });

}

function getLocDetails(obj) {
    
    var request = {
        placeId: obj.place_id
        //key: 'AIzaSyBEmSuFeHW0LS6o8fEBH7uVo9AK3qw63ok'
        //language: 'ar'
    };

    // send request
    service = new google.maps.places.PlacesService(map);
    service.getDetails(request, createMarker);

}
// creare single marker function
function createMarker(obj,status) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {

        var ss = '';
        var infowindow;
        var photos = obj.photos;

        if (photos) { ss = photos[0].getUrl({ 'maxWidth': 100, 'maxHeight': 70 }); }

        //"<tr><td>Type:</td> <td><select id='type'>" +
        //"<option value='bar' SELECTED>bar</option>" +
        //"<option value='restaurant'>restaurant</option>" +
        //"</select> </td></tr>" + 

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

            //infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            //                     'Place ID: ' + place.place_id + '<br>' +
            //                     place.geometry.location);

        }
        else {
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

        }


        // add event handler to current marker
        google.maps.event.addListener(mark, 'click', function () {

            //clearInfos();

            var ss = "";
            var rr;

            //$.getJSON('api/Pois' + '/' + Id)
            //    .done(function (data) {
            //        ss = data.Address  ;
            //    })
            //    .fail(function (jqXHR, textStatus, err) {
            //        ss = err;
            //    });

            //$.ajax({
            //    type: 'GET',
            //    data: JSON.stringify(Id),
            //    datatype:'text' ,
            //    url: 'api/Pois',
            //    success: function (result) {
            //        ss = result;
            //    }
            //});

            //var poi = {
            //            Placeid: obj.place_id,
            //            Placename: 'a',
            //            Address: 'a',
            //            Country: 'a',
            //            Description: 'a',
            //            Longtitude: 2.2,
            //            Latitude: 3.3,
            //            Altitude: 1,
            //            Icon: 'a',
            //            MainPhoto: 'a',
            //            Video: 'a',
            //            Wiki: 'a',
            //            ARName: 'a',
            //            ARPhoto: 'a',
            //            Website: 'a'
            //};
            $.ajax({
                url: 'api/pois/' + obj.place_id,
                type: 'GET',
                async: false,
                contentType: 'application/json; charset=utf-8',
                success: function (data, textStatus, xhr) {
                    obj.name = ((data.PlaceName == '') ? obj.Placename : data.PlaceName);
                    obj.Address = ((data.Address == '') ? obj.Address : data.Address);
                    obj.Description = ((data.Description == '') ? obj.Description : data.Description);
                    obj.website = ((data.website == '') ? obj.website : data.website);
                    obj.Icon = ((data.Icon == '') ? obj.Icon : data.Icon);
                    obj.MainPhoto = ((data.MainPhoto == '') ? obj.MainPhoto : data.MainPhoto);
                    obj.Video = ((data.Video == '') ? obj.Video : data.Video);
                    obj.Wiki = ((data.Wiki == '') ? obj.Wiki : data.Wiki);
                    obj.ARName = ((data.ARName == '') ? obj.ARName : data.ARName);
                    obj.ARPhoto = ((data.ARPhoto == '') ? obj.ARPhoto : data.ARPhoto);
                    obj.website = ((data.Website == '') ? obj.website : data.Website);
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(textStatus);
                }
            });

            var infocontent = "<b><center><font size=4>" + obj.name + "</font></center></b><br>" +
                   "<table style='width:400px;'>" +
                   "<tr><td>PlaceId:</td> <td><input type='text' id='PlaceId' value='" + obj.place_id + "' style='width:300px;'/> </td> </tr>" +
                   "<tr><td>PlaceName:</td> <td><input type='text' id='PlaceName' value='" + obj.name + "'style='width:300px;'/></td> </tr>" +
                   "<tr><td>Address:</td> <td><input type='text' id='Address' value='" + obj.Address + "' style='width:300px;'/></td> </tr>" +
                   "<tr><td>Description:</td> <td><textarea id='Description' maxlength='200' rows='5' cols='50'  value='" + obj.Description + "' ></textarea></td> </tr>" +
                   "<tr><td>Website:</td> <td><input type='url' id='Website'  value='" + obj.website + "' style='width:300px;'/></td> </tr>" +
                   "<tr><td>Longtitude:</td> <td><input type='number' step='0.01' id='Longtitude'  value='" + obj.geometry.location.lng() + "' /></td> </tr>" +
                   "<tr><td>Latitude:</td> <td><input type='number' step='0.01' id='Latitude'  value='" + obj.geometry.location.lat() + "' /></td> </tr>" +
                   "<tr><td>Altitude:</td> <td><input type='number' step='0.01' id='Altitude'  value='" + obj.Altitude + "'/></td> </tr>" +
                   "<tr><td>Icon:</td> <td><input type='url' id='Icon' style='width:300px;'  value='" + obj.Icon + "'/></td> </tr>" +
                   "<tr><td>MainPhoto:</td> <td><input type='url' id='MainPhoto'  value='" + obj.MainPhoto + "' style='width:300px;'/></td> </tr>" +
                   "<tr><td>Video:</td> <td><input type='url' id='Video' style='width:300px;' value='" + obj.Video + "'/></td> </tr>" +
                   "<tr><td>Wiki:</td> <td><input type='url' id='Wiki' style='width:300px;' value='" + obj.Wiki + "'/></td> </tr>" +
                   "<tr><td>ARName:</td> <td><input type='text' id='ARName' style='width:300px;' value='" + obj.ARName + "'/></td> </tr>" +
                   "<tr><td>ARName:</td> <td><input type='text' id='ARPhoto' style='width:300px;' value='" + obj.ARPhoto + "'/></td> </tr>" +
                   "<tr><td>ARName:</td> <td><input type='text' id='website' style='width:300px;' value='" + obj.website + "'/></td> </tr>" +
                   "<tr><td></td><td><b><input type='button' value='Save' onclick='saveData()'/></b></td></tr>";

            // prepare info window

                infowindow = new google.maps.InfoWindow({
                content: infocontent
            });

            infowindow.open(map, mark);

        });


        infos.push(infowindow);

    }
}

// initialization
google.maps.event.addDomListener(window, 'load', initialize);
