function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function users(){
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((res) => {
            shuffleArray(res);
            res.forEach(user => {
                let userNode = document.createElement('div');
                userNode.className ='table-row';

                userNode.innerHTML = `
                <div class="table-item"></div>
                <div class="table-item"></div>
                <div class="table-item"></div>
                <div class="table-item"></div>
            `;

                let items = userNode.querySelectorAll('.table-item');

                items[0].appendChild(document.createTextNode(user.username));
                items[1].appendChild(document.createTextNode(user.name));
                items[2].appendChild(document.createTextNode(user.phone));
                items[3].appendChild(document.createTextNode(user.company.name));

                document.querySelector('.main_table .table').append(userNode);
            })
        })
        .catch(() => {
            document.querySelector('.error').style.display = 'block';
        })
        .finally(() => {
            document.querySelector('.loader').style.display = 'none';
        });

}

window.addEventListener("load", () => {
    setTimeout(users, 2000);
});


