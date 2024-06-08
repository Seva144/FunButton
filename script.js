/*AddEventListener - обработчик событий*/
document.addEventListener("DOMContentLoaded", () => {

    /*Передать константу кнопки в скрипт по id*/
    const btn = document.getElementById("runawayBtn");

    /*Для получения текущего расположения кнопки*/
    const btnRect = btn.getBoundingClientRect();

    /*window.innerWidth ширина экрана*/
    /*window.innerHeight высота экрана*/
    /*btnRect.width btnRect.height ширина и высота кнопки*/
    const centerX = (window.innerWidth - btnRect.width) / 2;
    const centerY = (window.innerHeight - btnRect.height) / 2;
    /*чтобы кнопка оставалась в одном месте*/
    btn.style.position = "fixed";
    /*центрируем кнопку*/
    btn.style.left = `${centerX}px`;
    btn.style.top = `${centerY}px`;
    /*Вычисляем координаты курсора. Event - информацию о событии мышки, включая координаты курсора.*/
    /*Объект btnRect, который хранит информацию о размерах и позиции кнопки*/
    function getMouseCoords(event, btnRect) {
        return {
            x: event.clientX - (btnRect.left + window.scrollX + btnRect.width / 2),
            y: event.clientY - (btnRect.top + window.scrollY + btnRect.height / 2),
        };
    }
    function calculateNewPosition(deltaX, deltaY, btnRect) {
        let newX = btnRect.left + deltaX + window.scrollX;
        let newY = btnRect.top + deltaY + window.scrollY;

        newX = Math.max(0, Math.min(newX, window.innerWidth - btnRect.width));
        newY = Math.max(0, Math.min(newY, window.innerHeight - btnRect.height));

        return { newX, newY };
    }

    btn.addEventListener("mousemove", (event) => {
        const btnRect = btn.getBoundingClientRect();
        const maxDistance = 150;
        const mousePos = getMouseCoords(event, btnRect);

        const deltaX = mousePos.x > 0 ? -maxDistance : maxDistance;
        const deltaY = mousePos.y > 0 ? -maxDistance : maxDistance;

        const { newX, newY } = calculateNewPosition(deltaX, deltaY, btnRect);

        btn.style.left = `${newX}px`;
        btn.style.top = `${newY}px`;
    });
});