const geolocation = document.querySelector("#geolocation");
const timezone = document.querySelector("#timezone");
const time = document.querySelector("#time");

const btn = document.querySelector(".j-btn-test");

// Ошибка
const error = () => {
    geolocation.textContent = "Информация о местоположении недоступна";
};

// Успешное получение геолокации
const success = (position) => {
    // console.log("position", position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    geolocation.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
    timezone.textContent = "Временная зона...";

    fetch(
        `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            timezone.textContent = data.timezone;
            time.textContent = data.date_time_txt;
        })
        .catch((err) => {
            timezone.textContent = "Ошибка. Временная зона недоступна";
            time.textContent = "";
            console.log("Ошибка. Функция временно недоступна");
        });
};

btn.addEventListener("click", () => {
    if (!navigator.geolocation) {
        geolocation.textContent = "Геолокация не поддерживается вашим браузером";
    } else {
        geolocation.textContent = "Определение вашего местоположения";
        navigator.geolocation.getCurrentPosition(success, error);
    }
});