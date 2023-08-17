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
    const placename = (n) => document.querySelector('.meteo_place span').innerText = n
    
    // Таблица в которую все выводится
    const table = document.querySelector('table.meteo_table')
    
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
    const canvas = document.querySelector(".meteo_chart");
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
                    resp.hourly.avg2_5 = {}
                    resp.hourly.avg10 = {}

                    resp.hourly.time = resp.hourly.time.map(

                    
                    (element,index) => {
                        with(new Date(element)){
                            const l = toLocaleDateString()
                            const t = toLocaleTimeString().substring(0,5)

                            // Суммирует значения по датам и записывает в словарь
                            const oper = (a,b) => {
                                const l2 = l + " 12:00"
                                if (a[l2] === undefined){
                                    a[l2] = b[index]
                                }else{
                                    a[l2] += b[index]
                                }
                            }
                            oper(resp.hourly.avg2_5, resp.hourly.pm2_5)
                            oper(resp.hourly.avg10, resp.hourly.pm10)
                            
                            // Заменяем время на локальное
                            return ( t == '00:00' | t == '12:00') ? l + ' ' + t : t
                                   
                        }
                    })
                    // Преобразует словарь сумм по датам в массив объектов с "x" и "y",
                    // где y - среднее за сутки
                    const oper = a => {
                        const r = []
                        Object.keys(a).forEach((e,i)=>{
                            r[i] = {
                                x: e,
                                y: a[e] / 24
                            }
                        })
                        return r
                    }
                    resp.hourly.avg2_5 = oper(resp.hourly.avg2_5)
                    resp.hourly.avg10 = oper(resp.hourly.avg10)
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
                                    type: 'line',
                                    label: 'pm 2.5',
                                    borderColor: '#ff9999',
                                    backgroundColor: '#ff9999',
                                    data: pm2_5
                                },{
                                    type: 'line',
                                    label: 'pm 10',
                                    borderColor: '#9999ff',
                                    backgroundColor: '#9999ff',
                                    data: pm10
                                },{
                                    type: 'bar',
                                    label: 'Среднесуточный pm 2.5',
                                    borderColor: '#ff999999',
                                    backgroundColor: '#ff999999',
                                    data: avg2_5
                                },{
                                    type: 'bar',
                                    label: 'Среднесуточный pm 10',
                                    borderColor: '#9999ff99',
                                    backgroundColor: '#9999ff99',
                                    data: avg10
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