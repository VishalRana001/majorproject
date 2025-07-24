     
	mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // ID of the HTML element (e.g., <div id="map"></div>)
    center: listing.geometry.coordinates, // Must be [lng, lat]
    zoom: 9,
});

const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h4>${listing.title}</h4><p>Exact Location Provided After Booking</p>`
        )
    )
    .addTo(map);
