function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function users(){
    try {
        let res = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=2&_page=${1 + Math.floor(Math.random() * 4)}`);
        let users = await res.json();
        shuffleArray(users);
        users.forEach(user => {
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
    } catch(e) {
        document.querySelector('.error').style.display = 'block';
    }
    finally {
        document.querySelector('.loader').style.display = 'none';
    }
}

window.addEventListener("load", () => {
    setTimeout(users, 2000);
});


