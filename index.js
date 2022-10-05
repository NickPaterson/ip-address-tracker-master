// Open street map

let map = L.map('map').setView([51.507351, -0.127758], 13);
const updateMap = (lat = 51.507351, lng = -0.127758) => {
    map.setView([lat, lng], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
    }).addTo(map);
    L.marker([lat, lng]).addTo(map);
}

updateMap();


// GEO IPIFY API
const GEO_API_KEY = 'at_AaNm22aV7tpXnALrpZqYLIVcjjBHG';
const GEO_URL = `https://geo.ipify.org/api/v1?apiKey=${GEO_API_KEY}`;

function fetchLocationData(ip) {
    fetch(`${GEO_URL}&ipAddress=${ip}`)
    .then(response => response.json())
    .then(data => {
        const { lat, lng } = data.location;
        updateMap(lat, lng);
        document.getElementById('ip').innerText = data.ip;
        document.getElementById('location').innerText = `${data.location.country}, ${data.location.region} ${data.location.city}`;
        document.getElementById('timezone').innerText = `UTC ${data.location.timezone}`;
        document.getElementById('isp').innerText = data.isp;
    })
}


// Form submit
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ip = document.querySelector('input').value;
    fetchLocationData(ip);
})