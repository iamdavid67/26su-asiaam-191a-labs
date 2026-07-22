// declare variables
let mapOptions = {'centerLngLat': [-118.444,34.0709],'startingZoomLevel':5}

const map = new maplibregl.Map({
  container: 'map', // container ID
  style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
  center: mapOptions.centerLngLat, // Starting position [lng, lat]
  zoom: mapOptions.startingZoomLevel // Starting zoom level
});

function addMarker(data){
  let popup_message;
  let lng = data['Longitude'];
  let lat = data['Latitude'];
  if (data['What is your opinion of data centers?'] == "Negative"){
    popup_message = `<h2>Negative</h2> <h3>Location: ${data['Data Center Location']}</h3> <p>Experience: ${data['What has your experience been?']}</p>`
  }
  else{
    popup_message = `<h2>Not Negative</h2> <h3>Location: ${data['Data Center Location']}</h3> <p>Experience: ${data['What has your experience been?']}</p>`
  }
  new maplibregl.Marker()
    .setLngLat([lng, lat])
    .setPopup(new maplibregl.Popup()
      .setHTML(popup_message))
    .addTo(map)
  createButtons(lat,lng,data['Data Center Location']);
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

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZk7AOGiwqBa7xk71h-M0aULJCWehUXSidxzbyN5AjSy3DCul2nnG2EksK-gyxT_GPdkaPzdAMSZtJ/pub?output=csv"

// When the map is fully loaded, start adding GeoJSON data
map.on('load', function() {
    // Use PapaParse to fetch and parse the CSV data from a Google Forms spreadsheet URL
    Papa.parse(dataUrl, {
        download: true, // Tells PapaParse to fetch the CSV data from the URL
        header: true, // Assumes the first row of your CSV are column headers
        complete: function(results) {
            // Process the parsed data
            processData(results.data); // Use a new function to handle CSV data
        }
    });
});

function processData(results){
  console.log(results) //for debugging: this can help us see if the results are what we want
  results.forEach(feature => {
    //console.log(feature) // for debugging: are we seeing each feature correctly?
    // assumes your csv has a "Data Center Location" and "What has your experience been?" attribute
    // let coordinates = feature.geometry.coordinates;
    let longitude = feature['Longitude']
    let latitude = feature['Latitude'];
    let title = feature['Data Center Location'];
    let message = feature['What has your experience been?'];
    addMarker(feature);
  });
};