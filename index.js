const API_URL = 'https://geo.ipify.org/api/v1';
const API_KEY = 'at_h0eWC23Pys7l1nhs287s10K83LSRL';

const HTMLResponse = document.querySelector('#info');
let map; 

function handleSubmit(IPformulario) {
    fetch(`${API_URL}?apiKey=${API_KEY}&ipAddress=${IPformulario}`)
    .then(response => response.json())
    .then(info => {   
        const latitude = info.location.lat;
        const longitude = info.location.lng;
        const ip = info.ip;
        const location = `${info.location.region}, ${info.location.country}`;
        const timezone = info.location.timezone;
        const ISP = info.isp;

        const tpl = `
            <p><span>IP Address</span><br /> ${ip}</p>
            <p><span>Location</span><br /> ${location}</p>
            <p><span>Timezone</span><br /> ${timezone}</p>
            <p><span>ISP</span><br /> ${ISP}</p>
        `;
        HTMLResponse.innerHTML = tpl;

        if (!map) {
            map = L.map('map').setView([latitude, longitude], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        } else {
            map.setView([latitude, longitude], 13);
        }

        L.marker([latitude, longitude]).addTo(map)
            .openPopup();
    })
    .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    const defaultIP = ''; 
    document.getElementById('ip').value = defaultIP;
    handleSubmit(defaultIP);
});


const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    const IPformulario = document.getElementById('ip').value;
    handleSubmit(IPformulario);
});

