// Изолируем глобальный контекст
(() => {
    const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
    const API_URL_GEO_DATA = 'https://geocode-maps.yandex.ru/1.x/'
    const API_URL_METEO_DATA = 'https://air-quality-api.open-meteo.com/v1/air-quality'

    // Собирает запрс из базового URL и словаря параметров
    const fetchurl = (u,s) => {
        const r = new URL(u)
        r.search = new URLSearchParams(s)
        return fetch(r).then(resp => resp.json())
    }

    // Устанавливает название местоположения
    const placename = (n) => document.querySelector('#meteo_data th span').innerText = n
    
    // Таблица в которую все выводится
    const table = document.querySelector('#meteo_data table')
    
    // Заполняем шаблоны
    const headTemplate = table.querySelector('tr:has(>th)').cloneNode(1)
    const rowTemplate = table.querySelector('tr:has(>td)').cloneNode(1)
    
    // Добавляет строку в таблицу, созданную по шаблону и заполненную значениями
    const mkrow = (template, data) =>{
        const row = template.cloneNode(1)
        const items = row.querySelectorAll('th,td')
        data.forEach((v,i) => items[i].innerText = v)
        table.append(row)
    }
    
    // Очищает таблицу
    const clearTable = () => table.querySelectorAll('tr').forEach(node => node.remove())
    clearTable()
    
    // Запрлняет таблицу результатами запроса
    const fillTable = async resp => {
        clearTable()
        // Добавляем заголовок
        mkrow(headTemplate,[
            'Время',
            `pm2_5\n[${resp.hourly_units.pm2_5}]`,
            `pm10\n[${resp.hourly_units.pm10}]`
        ])
        // Создаем строки по шаблону, заполняем их данными
        // и добавляем в таблицу
        with(resp.hourly){
            time.forEach((element,index) => {
                mkrow(rowTemplate,[
                    element,
                    pm2_5[index],
                    pm10[index]
                ])
            })
        }
    }

    // Находим график и его контекст
    const canvas = document.getElementById("canvas");
    // Создаем и настраиваем график
    const chart = new Chart(
        canvas,{
            type: 'line',
            options:{
                scales: {
                    y:{
                        beginAtZero: true
                    }
                }
            }
        }
    )
    
    // Ищем стоку ввода
    const search = document.getElementById('search')
    search.onkeyup = function(){

        // Сибираем URL и делаем запрос к Yandex
        fetchurl(API_URL_GEO_DATA, {
            apikey: API_KEY_YANDEX,
            geocode: this.value,
            format: 'json'
        })
        .then(resp =>{

            // Обрабатываем ответ Yandex
            const GeoObject = resp.response.GeoObjectCollection.featureMember[0].GeoObject
            if(GeoObject){
                placename(GeoObject.name)
                const pos = GeoObject.Point.pos.split(' ')

                // Собираем URL и делаем запрос к open-meteo
                fetchurl(API_URL_METEO_DATA, {
                    latitude: pos[0],
                    longitude: pos[1],
                    hourly: 'pm10,pm2_5'
                })
                .then(resp => {
                    resp.hourly.time = resp.hourly.time.map(

                    // Заменяем время на локальное
                    (element) => {
                        with(new Date(element)){
                            return (getHours() === 0 ? toLocaleDateString()+' ':'')+
                                       toLocaleTimeString().substring(0,5)
                        }
                    })
                    return resp
                })
                .then( resp =>{

                    // Заполняем таблицу
                    fillTable(resp)

                    // Передаем данные в chart
                    with(resp.hourly){
                        chart.data = {
                            labels: time,
                            datasets:[
                                {
                                    label: 'pm 2.5',
                                    data: pm2_5
                                },{
                                    label: 'pm 10',
                                    data: pm10
                                }
                            ]
                        }
                    }
                    // Перерисовываем chart
                    chart.update()
                })
            }
        }).catch(()=>{
            placename('Не найдено')
            clearTable()
            chart.data = {}
            chart.update()
        })
    }
    search.onpaste = search.onkeyup
})()