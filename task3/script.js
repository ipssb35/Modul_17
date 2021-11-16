const screensize = document.querySelector("#screensize");
const geolocation = document.querySelector("#geolocation");
const btn = document.querySelector(".j-btn-test");

// Ошибка
const error = () => {
    geolocation.textContent = "Информация о местоположении недоступна";
};

// Успешное получение геолокации
const success = (position) => {
    console.log("position", position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    geolocation.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
};

btn.addEventListener("click", () => {
    screensize.textContent = `Размер экрана: ${window.screen.width}x${window.screen.height}`;
    if (!navigator.geolocation) {
        geolocation.textContent = "Геолокация не поддерживается вашим браузером";
    } else {
        geolocation.textContent = "Определяется ваше местоположение";
        navigator.geolocation.getCurrentPosition(success, error);
    }
});