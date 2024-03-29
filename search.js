// Custom marker
var iconMarkerEl = document.createElement("div");
iconMarkerEl.innerHTML = "<div class='marker-arrow'></div>" +
  "<div class='marker-pulse'></div>";

var geocoder = new PeliasGeocoder({
  params: {'access-token': 'P4QzOCt4wWfPKfuPuMF1UQSupLKLsO7ZC4DBRF6GAoC0AcaSAKRvD4v2vix948q7'},
  flyTo: 'hybrid',
  wof: true,
  url: 'https://places.jawg.io/v1',
  useFocusPoint: true,
  marker: {
    icon: iconMarkerEl,
    multiple: false
  },
  directionsListener : directionsListener
});
map.addControl(geocoder);

function directionsListener() {
  if(marker != undefined) {
    marker.remove();
  }
  map.addControl(directionsControl, 'top-left');
  map.removeControl(geocoder);
  isRouting = true;
}

document.getElementById('close-detail-button').onclick = function(e) {
  document.getElementById('detail-feature').style.display = "none";
};

function addMarker(feature) {
  if(marker != undefined) {
    marker.remove();
  }
  marker = new mapboxgl.Marker(iconMarkerEl).setLngLat([feature.geometry.coordinates[0], feature.geometry.coordinates[1]]).addTo(map);
}

function showDetailFeature(feature) {
  addMarker(feature);
  document.getElementById('detail-feature').style.display = "block";
  let featureName = document.getElementById("feature-name");
  featureName.innerHTML = feature.properties.name + "<br>"
                        + "<div class='feature-type'>" + feature.geometry.type + "</div>";
  let featureCoordinates = document.getElementById("feature-coordinates");
  featureCoordinates.innerHTML = '<i class="fas fa-compass"></i>  ' + feature.geometry.coordinates[0] + ", " + feature.geometry.coordinates[1];
  let featureLocation = document.getElementById("feature-location");
  featureLocation.innerHTML = '<i class="fas fa-map"></i>  ' + feature.properties.street + ", " + feature.properties.county + ", "
                              + feature.properties.region + ", " + feature.properties.country;
}