// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-118.43732, 34.07174], // Starting position [lng, lat]
    zoom: 15 // Starting zoom level
});

// Add a marker to the map
new maplibregl.Marker()
    .setLngLat([-118.43732, 34.07174])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('UCLA Graduate Housing<br>Where I first lived in!'))
    .addTo(map);

function addMarker(lat, lng, title, desc) {
    let popup = `<h3>${title}</h3> ${desc}`;
    new maplibregl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
            .setHTML(popup))
        .addTo(map);
    createButtons(lat, lng, title);
    return "Marker " + title + " added!"
};

function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
        });
    });
    document.getElementById("contents").appendChild(newButton);
};

function init() {
addMarker(34.138329, -118.359512, "AMC Universal Cinema at CityWalk Hollywood", "my favorite theater");
addMarker(34.058812, -118.418731, "Westfield Century City", "the BEST parking structure EVER");
addMarker(34.049801, -118.451286, "Sun Nong Dan", "Sun Nong Dan");
}

init();

function multiply(num1, num2) {
    console.log(num1 * num2);
}
