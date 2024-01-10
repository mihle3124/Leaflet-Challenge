
// Store API endpoint to query
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(url).then(function (data) {
    //Send the data.features object to the create Features function
    createFeatures(data.features);   
});

//Define a function to run each feature in the features array
function createFeatures(earthquakeData) {
    //Give each feature a popup that describes the place and time of the earthquake
    function onEachFeature(feature,layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>)}`);
    };

    //Create GEOJSON layer that contains earthquakeData object
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: function(features, coordinates) {
        let depth = features.properties.mag;
        let geoMarkers = {
            radius: depth * 5,
            fillColor: colors(depth),
            fillOpacity: 0.7,
            weight: 0.5
        };
        return L.circleMarker(coordinates, geoMarkers);
        }
    });

createMap(earthquakes);
};

//Color function
function colors(depth) {
    let color = "";
    if (depth <=1) {
        return color = "#66ff66";
    }
    else if (depth <= 2) {
        return color = "#ccda8b";
    }
    else if (depth <= 3) {
        return color = "#dbbc57";
    }
    else if (depth <= 4) {
        return color = "#eaa448";
    }
    else if (depth <= 5) {
        return color = "#ed7545";
    }
    else {
        return color = "#f94039"
    }
};

//Create Map function
function createMap(earthquakes) {

    //Base layer
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    //Topography layer
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    //Grayscale layer
    var grayscale = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
    });

    //Create a baseMaps Object
    var baseMaps = {
        "Street Map": street,
        "Topographic Map": topo,
        "Grayscale Map": grayscale
    };

    //Create an overlay object to hold our overlay
    var overlayMaps = {
        Earthquakes: earthquakes
    };

    //Create map, using street map and earthquakes layers to display
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [street, earthquakes]
    });

    //Legend Formatting
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function() {
        let div = L.DomUtil.create('div', 'info legend');
        let magnitudes = [-10, 10, 30, 60, 90];
        let colors = [
            "#f94039",
            "#ed7545",
            "#eaa448",
            "#dbbc57",
            "#ccda8b",
            "#66ff66"];
            
        for (let i = 0; i < magnitudes.length; i++) {
            div.innerHTML +="<i style='background:" 
            + colors[i] 
            + " '></i>" 
            + magnitudes[i] 
            + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
        }    

        return div;
    };

    // Add legend to map
    legend.addTo(myMap);

    //Create a layer control.
    //Pass it our baseMaps and overLayMaps
    //Add the layer congtrol to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
};        
        