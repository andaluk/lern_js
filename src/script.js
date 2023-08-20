// Изолируем от глобального контекста
(() => {
  const fixed = 5;

  // Сразу находим все элементы
  const temperature = document.getElementById("temperature-input");
  const selector = document.getElementById("unit-select");
  const res = document.getElementById("result");

  // Процедура конвертации
  const convert = () => {
    const value = parseFloat(temperature.value);
    const r =

      // Вычисляем в зависимости от значения селектора едениц измерения
      selector.value === "Celsius"
        ? ((value - 32) * 5) / 9
        : (value * 9) / 5 + 32;

    // Если получилось число выводим его, иначе сообщение о ошибке
    res.textContent = isNaN(r) ? "Ошибка перевода" : r.toFixed(fixed);
  };
  // Заполняем листнеры событий нашей функцией
  temperature.addEventListener("keyup", convert);
  temperature.addEventListener("change", convert);
  selector.addEventListener("change", convert);
})();
