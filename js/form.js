let week = [];

let settings = {
    sub: 3,
    days: 5
};

let DOM = {
    week: null,
    settingsForm: null,
}

function getDOM() {
    DOM.week = document.querySelector(".week");

    DOM.settingsForm = document.querySelector("#settings");
    DOM.settingsForm.addEventListener("submit", settingsHandler);
}

function settingsHandler(event){
    event.preventDefault();

    settings.sub = parseInt(DOM.settingsForm.querySelector('select[name="amount-subjects"]').value);
    settings.days = parseInt(DOM.settingsForm.querySelector('select[name="amount-day"]').value);

    week = new Array(settings.days).fill(0).map(_ => []);

    save();
    render();
}

function add(event) {
    event.preventDefault();
    let day = parseInt(event.target.dataset.day);

    let text = event.target.querySelector("input").value;

    if (text.replace(/ /g, '') === '') {
        return;
    }

    week[day].push(text);

    save();
    render();
}


function render() {
    let dayNames = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

    DOM.week.innerHTML = "";

    week.forEach((dayItem, weekIndex) => {
        let day = document.createElement("div");

        day.className = 'day';

        day.innerHTML = `
            <div class="day-name">
                ${dayNames[weekIndex]}
            </div>
            <form data-day="${weekIndex}">
                <input placeholder="Наименование занятия" type="text" name="text" ${dayItem.length === settings.sub ? 'disabled' : ''}>
            </form>
            <div class="day-list">
                
            </div>
        `;

        day.querySelector("form").addEventListener("submit", add);

        dayItem.forEach((actionItem, dayIndex) => {
            let action = document.createElement("div");

            action.className = "day-item";

            action.innerHTML = `
                <div class="day-item__index"><span>${dayIndex + 1}</span></div>
                <div class="day-item__content">${actionItem}</div>
            `;

            action.addEventListener("click", () => {
                week[weekIndex].splice(dayIndex, 1);
                save();
                render();
            })

            day.querySelector(".day-list").appendChild(action);
        })
        DOM.week.appendChild(day);
    });
}

function save() {
    localStorage.setItem('settings', JSON.stringify(settings));
    localStorage.setItem('week', JSON.stringify(week));
}


window.addEventListener("load", () => {
    week = localStorage.getItem('week') ? JSON.parse(localStorage.getItem('week')) : week;
    settings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : settings;

    getDOM();

    DOM.settingsForm.querySelector('select[name="amount-subjects"]').value = settings.sub;
    DOM.settingsForm.querySelector('select[name="amount-day"]').value = settings.days;

    render();
})