// Изолируем глобальный контекст
(() => {
    const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
    const API_URL_GEO_DATA = 'https://geocode-maps.yandex.ru/1.x/'
    const API_URL_METEO_DATA = 'https://air-quality-api.open-meteo.com/v1/air-quality'

    // Отступ осей от края рисунка
    const axisPadding = 20


    // Собирает запрс из базового URL и словаря параметров
    const mkurl = (u,s) => {
        const r = new URL(u)
        r.search = new URLSearchParams(s)
        return r
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
        resp.hourly.time.forEach((element,index) => {
            mkrow(rowTemplate,[
                element,
                resp.hourly.pm2_5[index],
                resp.hourly.pm10[index]
            ])
        })
    }

    // Находим график и его контекст
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Очищает график
    const clearCanvas = () => ctx.clearRect(0,0,canvas.width,canvas.height)
    clearCanvas()

    // Вычисляем концы координатных осей
    const points = [
        [axisPadding,0],
        [axisPadding,canvas.height],
        [0,canvas.height - axisPadding],
        [canvas.width,canvas.height - axisPadding]
    ]

    // Рисует кривую по координатам
    const paintLine = (resp, data) => {
        with(ctx)with(resp.hourly){
            beginPath()
            moveTo(dx,dy + ky * data[0])
            time.forEach((element,index) => {
                ctx.lineTo(
                    dx + kx * index,
                    dy + ky * data[index]
                )
            })
            stroke()
                    
        }
    }
    
    // Ищем стоку ввода
    const search = document.getElementById('search')
    search.onkeyup = function(){

        // Сибираем URL и делаем запрос к Yandex
        fetch(mkurl(API_URL_GEO_DATA, {
            apikey: API_KEY_YANDEX,
            geocode: this.value,
            format: 'json'
        }))
        .then(resp => resp.json())
        .then(resp =>{

            // Обрабатываем ответ Yandex
            const GeoObject = resp.response.GeoObjectCollection.featureMember[0].GeoObject
            if(GeoObject){
                placename(GeoObject.name)
                const pos = GeoObject.Point.pos.split(' ')

                // Собираем URL и делаем запрос к open-meteo
                fetch(mkurl(API_URL_METEO_DATA, {
                    latitude: pos[0],
                    longitude: pos[1],
                    hourly: 'pm10,pm2_5'
                }))
                .then(resp => resp.json())
                .then(resp => {
                    resp.hourly.time.forEach(

                    // Заменяем время на локальное
                    (element, ind) => {
                        element = new Date(element)
                        resp.hourly.time[ind] = `${element.toLocaleDateString()} ${element.toLocaleTimeString()}`
                    })

                    // Вычисляем мастабирующие коэффициенты по осям графика
                    resp.hourly.kx = (canvas.width - 2 * axisPadding) / resp.hourly.time.length
                    resp.hourly.ky = -(canvas.height - 2 * axisPadding) / (
                                     Math.max(...resp.hourly.pm2_5, ...resp.hourly.pm10) 
                                     )
                    // Вычисляем отступы по осям графика
                    resp.hourly.dx = axisPadding
                    resp.hourly.dy = canvas.height - axisPadding
                    return resp
                })
                .then( resp =>{

                    // Заполняем таблицу
                    fillTable(resp)

                    clearCanvas()
                    with(ctx){

                        // Рисуем тонки вертикальные линии на каждый час
                        beginPath()
                        lineWidth = 1
                        strokeStyle = "#ddd"
                        with(resp.hourly){
                            time.forEach((value,index)=>{
                                moveTo(dx + kx * index, dy)
                                lineTo(dx + kx * index, 0)
                            })
                        }
                        stroke()

                        // Рисуем кривые графиков
                        strokeStyle = "#f99"
                        lineWidth = 3
                        paintLine(resp,resp.hourly.pm2_5)
                        strokeStyle = "#9f9"
                        paintLine(resp,resp.hourly.pm10)

                        // Рисуем оси координат
                        beginPath()
                        strokeStyle = "#999"
                        moveTo(...points[0])
                        lineTo(...points[1])
                        moveTo(...points[2])
                        lineTo(...points[3])
                        stroke()
                    }
                })
            }
        }).catch(()=>{
            placename('Не найдено')
            clearTable()
            clearCanvas()
        })
    }
    search.onpaste = search.onkeyup
})()