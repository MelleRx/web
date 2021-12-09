const Form = function(){
    this.week = [];

    this.settings = {
        sub: 3,
        days: 5
    };

    this.DOM = {
        week: null,
        settingsForm: null
    };

    this.load();
    this.getDOM();
    this.initDOM();
    this.checkDisable();
}

Form.prototype.load = function(){
    this.settings = JSON.parse(localStorage.getItem('settings')) || this.settings;

    this.week = JSON.parse(localStorage.getItem('week')) || this.week;
};

Form.prototype.save = function(){
    localStorage.setItem('settings', JSON.stringify(this.settings));
    localStorage.setItem('week', JSON.stringify(this.week));
};

Form.prototype.getDOM = function(){
    let handler = event => {
        event.preventDefault();

        this.settings.sub = parseInt(this.DOM.settingsForm.querySelector('select[name="amount-subjects"]').value);
        this.settings.days = parseInt(this.DOM.settingsForm.querySelector('select[name="amount-day"]').value);

        this.week = new Array(this.settings.days).fill(0).map(_ => []);

        this.save();
        this.initDOM();
    }

    this.DOM.week = document.querySelector(".week");

    this.DOM.settingsForm = document.querySelector("#settings");
    this.DOM.settingsForm.addEventListener("submit", handler);
};

Form.prototype.initDOM = function(){
    this.DOM.settingsForm.querySelector('select[name="amount-subjects"]').value = this.settings.sub;
    this.DOM.settingsForm.querySelector('select[name="amount-day"]').value = this.settings.days;

    this.DOM.week.innerHTML = "";

    this.week.forEach((dayItem, index) => {
        let day = document.createElement("div");

        day.className = 'day';

        day.innerHTML = `
            <div class="day-name">
                ${["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"][index]}
            </div>
            <form data-day="${index}">
                <input placeholder="Текст задания" type="text" name="text">
            </form>
            <div class="day-list">
                
            </div>
        `;

        dayItem.forEach((actionItem, index) => {
            day.querySelector(".day-list").appendChild(this.createActionNode(index, actionItem));
        });

        day.querySelector("form").addEventListener("submit", this.add.bind(this));

        this.DOM.week.appendChild(day);
    });
};

Form.prototype.createActionNode = function(index, content){

    let action = document.createElement("div");
    action.className = "day-item";

    action.innerHTML = `
        <div class="day-item__index">   </div>
        <div class="day-item__content"></div>
    `;

    action.querySelector('.day-item__index').appendChild(document.createTextNode(++index));
    action.querySelector('.day-item__content').appendChild(document.createTextNode(content));

    return action;
}

Form.prototype.add = function(event){
    event.preventDefault();

    let day = parseInt(event.target.dataset.day);
    let text = event.target.querySelector("input").value;

    if(text.replace(/ /g, '') === ''){
        return;
    }

    this.week[day].push(text);

    this.DOM.week.querySelectorAll('.day')[day].appendChild(this.createActionNode(this.week[day].length - 1, text));

    this.checkDisable();
    this.save();

    event.target.querySelector('input').value = "";
    event.target.querySelector('input').blur();
};

Form.prototype.checkDisable = function(){
    this.week.forEach((weekItem, index) => {
        if(weekItem.length === this.settings.sub){
            this.DOM.week.querySelectorAll('.day')[index].querySelector('input').disabled = true;
        }
    });
};

window.addEventListener("load", () => {
    new Form();
})