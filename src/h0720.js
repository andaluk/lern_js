const el = document.getElementById('search')
el.onkeyup = function(){getMeteo(this.value)}
el.onpaste = el.onkeyup
function getMeteo(place_name){
    const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
    const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`

    fetch(API_URL_GEO_DATA).then(resp => resp.json())
    .then(resp =>{

        const div = document.getElementById('meteo_data')
        const go = resp.response.GeoObjectCollection.featureMember[0].GeoObject

        if(go){
            let a = `<div>Местоположение: ${go.name}</div>`
            let pos = go.Point.pos.split(' ')

            fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${pos[0]}&longitude=${pos[1]}&hourly=pm10,pm2_5`)
            .then(resp => resp.json()).then(resp =>{
                a +=`<table><tr><th>Время</th><th>pm2_5<br>[${resp.hourly_units.pm2_5}]</th><th>pm10<br>[${resp.hourly_units.pm10}]</th></tr>`
                resp.hourly.time.forEach((element,index) => {
                    const date = (new Date(element)).toLocaleDateString()
                    const time = (new Date(element)).toLocaleTimeString()
                    a +=`<tr><td>${date} ${time}</td><td>${resp.hourly.pm2_5[index]}</td><td>${resp.hourly.pm10[index]}</td></tr>`
                })
                a += '</table>'
                div.innerHTML = a
            })
            
        }else{
            div.innerHTML = ''
        }
    })
}