const API_URL= `https://geo.ipify.org/api/v2/country,city?apiKey=at_h0eWC23Pys7l1nhs287s10K83LSRL&`

const HTMLResponse=document.querySelector('#info') 
const formulario = document.getElementById('formulario');



const respondForm = formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    const IPformulario = document.getElementById('ip').value;
    console.log(IPformulario)
});
console.log(respondForm)
fetch(`${API_URL}ipAddress`)
.then((response)=>response.json())
.then((info)=>{
    const latitude=`${info.location.lat}`
    const longitude=`${info.location.lng}`
    const ip=`${info.ip}`
    const location=`${info.location.region},${info.location.country}`
    const timezone=`${info.location.timezone}`
    const ISP=`${info.isp}`
    const map = L.map('map').setView([latitude, longitude], 13);
    const tpl = 
        `
            <td>${ip}</td>
            <td> ${location}</td>
            <td>${timezone}</td>
            <td>${ISP}</td>
        `
    HTMLResponse.innerHTML=`<tr>${tpl}</tr>`
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
        .openPopup();

})
 
