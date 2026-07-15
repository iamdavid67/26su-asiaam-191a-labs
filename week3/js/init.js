// Declare global variables
let mapOptions = {
    'centerLngLat': [-118.444, 34.070],
    'startingZoomLevel': 10
}

// Initialize the map
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1',
    center: mapOptions.centerLngLat,
    zoom: mapOptions.startingZoomLevel
});

function addMarker(lat,lng,title,color){
    let popup_message = `<h2>${title}</h2>`
    new maplibregl.Marker({color: color})
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
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

function processData(results) {
    results.features.forEach(element => {
        addMarker(
            element.geometry.coordinates[1], // latitude
            element.geometry.coordinates[0], // longitude
            element.properties.place,
            element.properties.color,
        );
    });
}

map.on('load', function() {
    fetch("untitled.geojson")
        .then(response => {
            return response.json();
        })
        .then(data =>{
            processData(data);
        });
});

