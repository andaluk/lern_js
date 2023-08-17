function convertTemperature(value, unit) {
  if (unit === "Celsius") {
    return ((value - 32) * 5) / 9;
  } else if (unit === "Fahrenheit") {
    return (value * 9) / 5 + 32;
  }
}
document
  .getElementById("temperature-input")
  .addEvntListener("change", function () {
    const temperature = parseFloat(this.value);
    const unit = document.getElementById("unit-select").value;
    const convertedTemperature = convertTemperature(temperature, unit);
    document.getElementById("result").texContent =
      convertedTemperature.ToFixed(5);
  });
