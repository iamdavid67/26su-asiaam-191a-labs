// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [ -118.444, 34.0709], // Starting position [lng, lat]
    zoom: 15 // Starting zoom level
});

// Add a marker to the map
const marker1 = new maplibregl.Marker()
    .setLngLat([ -118.444, 34.0709])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I used to work in '))
    .addTo(map);

const marker2 = new maplibregl.Marker()
    .setLngLat([ -118.359512, 34.138329])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('my favorite theater '))
    .addTo(map);

const marker3 = new maplibregl.Marker()
    .setLngLat([ -118.418731, 34.058812])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('the BEST parking structure EVER '))
    .addTo(map);

const marker4 = new maplibregl.Marker()
    .setLngLat([ -118.451286, 34.049801])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('Sun Nong Dan '))
    .addTo(map);