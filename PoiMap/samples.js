﻿function initialize() {
    var latlng = new google.maps.LatLng(37.4419, -122.1419);
    var options = {
        zoom: 13,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map"), options);
    var html = "<table>" +
               "<tr><td>Name:</td> <td><input type='text' id='name'/> </td> </tr>" +
               "<tr><td>Address:</td> <td><input type='text' id='address'/></td> </tr>" +
               "<tr><td>Type:</td> <td><select id='type'>" +
               "<option value='bar' SELECTED>bar</option>" +
               "<option value='restaurant'>restaurant</option>" +
               "</select> </td></tr>" +
               "<tr><td></td><td><input type='button' value='Save & Close' onclick='saveData()'/></td></tr>";
    infowindow = new google.maps.InfoWindow({
        content: html
    });
}

//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJ9wzTpBhawokRWLkRYU6k64E&key=AIzaSyBEmSuFeHW0LS6o8fEBH7uVo9AK3qw63ok
//https://maps.googleapis.com/maps/api/place/details/output?placeid:ChIJ9wzTpBhawokRWLkRYU6k64E&key=AIzaSyBEmSuFeHW0LS6o8fEBH7uVo9AK3qw63ok
// server key: AIzaSyBEmSuFeHW0LS6o8fEBH7uVo9AK3qw63ok