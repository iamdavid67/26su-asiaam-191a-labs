// declare variables
let mapOptions = {'centerLngLat': [-118.444,34.0709],'startingZoomLevel':5}

const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1',
    center: mapOptions.centerLngLat,
    zoom: mapOptions.startingZoomLevel
});

function addMarker(data) {
    let lat;
    let lng;
    let title;
    let message;

    if (data['Have you been involved in a road rage incident?'] == 'Yes') {
        lat = data['lat'];
        lng = data['lng'];
        title = data['Location'];
        message = data['What happened during this road rage incident?'];
    } else {
        lat = data['altLat'];
        lng = data['altLng'];
        title = data['What city do you currently reside in?'];
        message = 'No incident reported.';
    }

    new maplibregl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(`<h3>${title}</h3>${message}`))
        .addTo(map)
    createButtons(lat,lng,title);
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
        })
    })
    document.getElementById("contents").appendChild(newButton);
}

function processData(results){
    console.log(results) //for debugging: this can help us see if the results are what we want
    results.forEach(feature => {
        addMarker(feature);
    });
};

const dataURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkF4ObpiKfcWVq7Pv99maZ_AGMmeaiqbeEcyI3Lw2hx9VF3oQbkBp0crjg4C4VCaYzBHVfp3LTwwfc/pub?output=csv';

map.on('load', function() {
    Papa.parse(dataURL, {
        download: true,
        header: true,
        complete: (results) => {
            processData(results.data);
        }
    });
});