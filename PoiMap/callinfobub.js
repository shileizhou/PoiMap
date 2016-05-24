var body = document.getElementsByTagName('body')[0];
var infoBubbleFlag = "nope";
var G = google.maps;
var pgCenter = new google.maps.LatLng(53.927125, -122.751994);
var initialLocation = new google.maps.LatLng(53.927125, -121.5);

var progressIsOn = 0;


var map;
var fPoints = new Array();
var endPoints = new Array();
var pLine;

var infoBubble;
var infoBubble1;
var infoBubble2;

var landingPageOptions = {
    disableDefaultUI: true,
    zoom: 8,
    center: initialLocation,
    maptiks_id: 'landing page'
};

var pgOptions = {
    disableDefaultUI: true,
    zoom: 8,
    center: initialLocation
}

var homeMarker1;
var homeMarker2;
var contactMarker

var mammoth;
var landsongs;
var pg;
var eco;
var nyc;

function home() {

    //initialLocation = new google.maps.LatLng(geoip_latitude(), geoip_longitude())

    map = new google.maps.Map(document.getElementById("map"), landingPageOptions);



    $("#main-nav li").removeClass('active');
    $("#navIndex").addClass('active');

    setTimeout("updateScreen();", 400);

}

function updateScreen() {

    homeMarker1 = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker.png",
        position: new google.maps.LatLng(initialLocation.lat() + 0.1, initialLocation.lng() - 1.0)
    });
    homeMarker2 = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker.png",
        position: new google.maps.LatLng(initialLocation.lat() - 0.5, initialLocation.lng() - 1.5)
    });

    infoBubble1 = new InfoBubble({
        map: map,
        content: '<div><p><b>Sparkgeo</b> can help put you (or your data) on the map!</p></div>',
        maxWidth: 200,
        shadowStyle: 1,
        padding: 10,
        borderRadius: 5,
        arrowSize: 10,
        borderWidth: 2,
        borderColor: '#ff964d',
        disableAutoPan: true,
        hideCloseButton: true,
        arrowPosition: 30,
        arrowStyle: 0
    });

    infoBubble2 = new InfoBubble({
        map: map,
        content: '<div><p>Whether its a Google Map like this, or some other kind of location based service, there is no doubt, <b>location is the new <i>black</i>.</b></p></div>',
        maxWidth: 200,
        shadowStyle: 1,
        padding: 10,
        borderRadius: 5,
        arrowSize: 10,
        borderWidth: 2,
        borderColor: '#ff964d',
        disableAutoPan: true,
        hideCloseButton: true,
        arrowPosition: 30,
        arrowStyle: 0
    });

    google.maps.event.addListener(homeMarker1, 'click', function () {
        infoBubble1.open(map, homeMarker1);
    });

    google.maps.event.addListener(homeMarker2, 'click', function () {
        infoBubble2.open(map, homeMarker2);
    });

    setTimeout("infoBubble1.open(map, homeMarker1);", 800);

    setTimeout("infoBubble2.open(map, homeMarker2);", 1200);

    infoBubbleFlag = "yep";

}

function story() {
    $("#main-nav li").removeClass('active');
    $("#navStory").addClass('active');
}

function services() {
    $("#main-nav li").removeClass('active');
    $("#navServices").addClass('active');

    var zoom = 2;
    var centerPoint = new google.maps.LatLng(40.178873, -50.767578);

    var servLoc1 = new google.maps.LatLng(54, -123);
    var servLoc2 = new google.maps.LatLng(38, -75);
    var servLoc3 = new google.maps.LatLng(48, 0);

    var servLine1 = new google.maps.LatLng(56, -123);
    var servLine2 = new google.maps.LatLng(40, -75);
    var servLine3 = new google.maps.LatLng(52, 0);


    //##################### ROUTES ##############################
    //===========================================
    var p = {
        start: servLine1,
        end: servLine2,
        color: '#FF9601'
    };
    endPoints.push(p);
    //===========================================
    var p = {
        start: servLine2,
        end: servLine3,
        color: '#FF9601'
    };
    endPoints.push(p);
    //===========================================

    var myOptions = {
        zoom: zoom,
        center: centerPoint,
        mapTypeId: G.MapTypeId.ROADMAP,
        disableDefaultUI: true
    }
    map = new google.maps.Map(document.getElementById('map'), myOptions);

    //########################## MARKERS ##########################

    var pg = new google.maps.Marker({
        map: map,
        position: servLoc1,
        icon: "/static/img/marker_icon.png",
    });

    var miami = new google.maps.Marker({
        map: map,
        position: servLoc2,
        icon: "/static/img/drip_icon.png",
    });

    var cairo = new google.maps.Marker({
        map: map,
        position: servLoc3,
        icon: "/static/img/gears_icon.png",
    });

    nextRoute();

}

function nextRoute() {
    if (endPoints.length) {
        fPoints = [];
        var p = endPoints.shift();
        plotRoute(p.start, p.end, p.color);
    }
}


function plotRoute(p1, p2, color) {

    with (Math) {
        var lat1 = p1.lat() * (PI / 180);
        var lon1 = p1.lng() * (PI / 180);
        var lat2 = p2.lat() * (PI / 180);
        var lon2 = p2.lng() * (PI / 180);

        var d = 2 * asin(sqrt(pow((sin((lat1 - lat2) / 2)), 2) + cos(lat1) * cos(lat2) * pow((sin((lon1 - lon2) / 2)), 2)));
        var f = (1 / 50) * fPoints.length;
        f = f.toFixed(6);
        var A = sin((1 - f) * d) / sin(d);
        var B = sin(f * d) / sin(d);
        var x = A * cos(lat1) * cos(lon1) + B * cos(lat2) * cos(lon2);
        var y = A * cos(lat1) * sin(lon1) + B * cos(lat2) * sin(lon2);
        var z = A * sin(lat1) + B * sin(lat2);

        var latN = atan2(z, sqrt(pow(x, 2) + pow(y, 2)));
        var lonN = atan2(y, x);
        var p = new G.LatLng(latN / (PI / 180), lonN / (PI / 180));
        fPoints.push(p);
        doPlot(fPoints, color);

        if (fPoints.length < 50) {
            window.setTimeout(function () { plotRoute(p1, p2, color) }, 50);
        }
        else {
            fPoints.push(p2);
            doPlot(fPoints, color);
            nextRoute();
        }
    }

}

function doPlot(points, color) {
    if (pLine) {
        pLine.setMap(null);
    }
    var pOpts = {
        path: fPoints,
        strokeColor: color,
        strokeOpacity: 1,
        strokeWeight: 10,
    };

    var pLine = new G.Polyline(pOpts);
    pLine.setMap(map);
}


function contact() {
    $("#main-nav li").removeClass('active');
    $("#navContact").addClass('active');

    pgOptions.center = new google.maps.LatLng(50, -122.751994);
    pgOptions.zoom = 2;


    var map = new google.maps.Map(document.getElementById("map"), pgOptions);

    contactMarker = new google.maps.Marker({
        map: map,
        position: pgCenter,
        icon: "/static/img/spkMarker_sm.png",
        draggable: false,
    });

    var mammoth = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker_sm.png",
        position: new google.maps.LatLng(37.648, -118.972),
        draggable: false,

    });

    var landsongs = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker_sm.png",
        position: new google.maps.LatLng(56.897, -124.96),
        draggable: false,
    });


    var eco = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker_sm.png",
        position: new google.maps.LatLng(9.324, -79.156),
        draggable: false,
    });

    var sf = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker_sm.png",
        position: new google.maps.LatLng(37.7750, -122.418),
        draggable: false,
    });

    var nyc = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker_sm.png",
        position: new google.maps.LatLng(40.7142, -74.0064),
        draggable: false,
    });

    var at = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker_sm.png",
        position: new google.maps.LatLng(30.2669, -97.7428),
        draggable: false,
    });

    var van = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker_sm.png",
        position: new google.maps.LatLng(49.2505, -123.1119),
        draggable: false,
    });

    var sen = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker_sm.png",
        position: new google.maps.LatLng(14.6943, -15.5953),
        draggable: false,
    });

    var haw = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker_sm.png",
        position: new google.maps.LatLng(21.3114, -157.7964),
        draggable: false,
    });



    infoBubble = new InfoBubble({
        map: map,
        content: "<div><p>This is where we live, work and ski. We travel almost anywhere though! Send us a message, let's talkâ€¦</p></div>",
        maxWidth: 200,
        shadowStyle: 0,
        padding: 10,
        borderRadius: 5,
        arrowSize: 10,
        borderWidth: 2,
        borderColor: '#ff964d',
        disableAutoPan: true,
        hideCloseButton: true,
        arrowPosition: 30,
        arrowStyle: 0
    });

    google.maps.event.addListener(contactMarker, 'click', function () {
        infoBubble.open(map, contactMarker);
    });

    setTimeout("infoBubble.open(map, contactMarker);", 500);

}

function blogs() {
    $("#main-nav li").removeClass('active');
    $("#navBlogs").addClass('active');
}

function projects() {
    $("#main-nav li").removeClass('active');
    $("#navProjects").addClass('active');

    bounds = new google.maps.LatLngBounds(new google.maps.LatLng(9.324, -124.96), new google.maps.LatLng(56.897, -79.156));

    map = new google.maps.Map(document.getElementById("map"), pgOptions);

    map.fitBounds(bounds);


    mammoth = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker.png",
        position: new google.maps.LatLng(37.648, -118.972),
        draggable: true,

    });

    landsongs = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker.png",
        position: new google.maps.LatLng(56.897, -124.96),
        draggable: true,
    });

    pg = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker_sm.png",
        position: initialLocation,
        draggable: true,
    });

    eco = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker.png",
        position: new google.maps.LatLng(9.324, -79.156),
        draggable: true,
    });

    var sf = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker_sm.png",
        position: new google.maps.LatLng(37.7750, -122.418),
        draggable: false,
    });

    nyc = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker.png",
        position: new google.maps.LatLng(40.7142, -74.0064),
        draggable: false,
    });

    var at = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker_sm.png",
        position: new google.maps.LatLng(30.2669, -97.7428),
        draggable: false,
    });

    var van = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker_sm.png",
        position: new google.maps.LatLng(49.2505, -123.1119),
        draggable: false,
    });

    var sen = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker_sm.png",
        position: new google.maps.LatLng(14.6943, -15.5953),
        draggable: false,
    });

    var haw = new google.maps.Marker({
        map: map,
        icon: "/static/img/spkMarker_sm.png",
        position: new google.maps.LatLng(21.3114, -157.7964),
        draggable: false,
    });

    maminfo = new InfoBubble({
        map: map,
        content: '<div><b><a href="http://www.sparkgeo.com/projects/mammothtrails" target="_blank">Mammoth Trails</a></b></div>',
        position: new google.maps.LatLng(37.648, -118.972),
        maxWidth: 200,
        shadowStyle: 2,
        padding: 10,
        borderRadius: 5,
        arrowSize: 10,
        borderWidth: 2,
        borderColor: '#ff964d',
        disableAutoPan: true,
        hideCloseButton: false,
        arrowPosition: 30,
        arrowStyle: 0
    });

    google.maps.event.addListener(mammoth, 'click', function () {
        maminfo.open(map, mammoth);
    });

    landinfo = new InfoBubble({
        map: map,
        content: '<div><b><a href="http://www.sparkgeo.com/projects/landsongs" target="_blank">Landsongs</a></b></div>',
        position: new google.maps.LatLng(56.897, -124.96),
        maxWidth: 200,
        shadowStyle: 2,
        padding: 10,
        borderRadius: 5,
        arrowSize: 10,
        borderWidth: 2,
        borderColor: '#ff964d',
        disableAutoPan: true,
        hideCloseButton: false,
        arrowPosition: 30,
        arrowStyle: 0
    });

    google.maps.event.addListener(landsongs, 'click', function () {
        landinfo.open(map, landsongs);
    });

    pginfo = new InfoBubble({
        map: map,
        content: '<div><b><a href="http://www.pgpothole.com" target="_blank">PG PotHole</a></b></div>',
        position: initialLocation,
        maxWidth: 200,
        shadowStyle: 2,
        padding: 10,
        borderRadius: 5,
        arrowSize: 10,
        borderWidth: 2,
        borderColor: '#ff964d',
        disableAutoPan: true,
        hideCloseButton: false,
        arrowPosition: 30,
        arrowStyle: 0
    });

    google.maps.event.addListener(pg, 'click', function () {
        pginfo.open(map, pg);
    });

    ecoinfo = new InfoBubble({
        map: map,
        content: '<div><b><a href="http://beta.ecoreserve.org" target="_blank">EcoReserve</a></b></div>',
        position: new google.maps.LatLng(9.324, -79.156),
        maxWidth: 200,
        shadowStyle: 2,
        padding: 10,
        borderRadius: 5,
        arrowSize: 10,
        borderWidth: 2,
        borderColor: '#ff964d',
        disableAutoPan: true,
        hideCloseButton: false,
        arrowPosition: 30,
        arrowStyle: 0
    });

    google.maps.event.addListener(eco, 'click', function () {
        pginfo.open(map, eco);
    });

    nycinfo = new InfoBubble({
        map: map,
        content: '<div><b><a href="http://www.sparkgeo.com/projects/wcs" >Over-The-Horizon Consumption</a></b></div>',
        position: new google.maps.LatLng(40.7142, -74.0064),
        maxWidth: 200,
        shadowStyle: 2,
        padding: 10,
        borderRadius: 5,
        arrowSize: 10,
        borderWidth: 2,
        borderColor: '#ff964d',
        disableAutoPan: true,
        hideCloseButton: false,
        arrowPosition: 30,
        arrowStyle: 0
    });

    google.maps.event.addListener(nyc, 'click', function () {
        nycinfo.open(map, nyc);
    });

}

function landsongs() {
    $("#main-nav li").removeClass('active');
    $("#navProjects").addClass('active');
}

function labs() {
    $("#main-nav li").removeClass('active');
    $("#navLabs").addClass('active');
}

function gisservices() {
    $("#main-nav li").removeClass('active');
    $("#navServices").addClass('active');
}
