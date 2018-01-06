var books = [{
    image: 'http://www.booksiti.net.ru/books/58932900.jpg',
    info: {
        title: 'Страна багровых туч',
        author: 'Аркадий и Борис Стругацкие',
        year: '1957'
    }
},
    {
        image: 'http://rusbuk.ru/uploads/book/1515510/bd575f039aafbea20ed97370adc0fe867c71eb54.jpeg',
        info: {
            title: 'Гиперболоид инженера Гарина',
            author: 'Алексей Толстой',
            year: '1927'
        }
    },
    {
        image: 'http://www.wwww4.com/w6022/3991278.jpg',
        info: {
            title: 'Вы, конечно, шутите, мистер Фейнман!',
            author: 'Ричард Фейнман',
            year: '1985'
        }
    }];

function init() {
    var table = document.getElementById('testTable');
    var rows = [];
    for (var i = 0; i < books.length; i++) {
        rows[i] = table.insertRow(i);
        for (var j = 0; j < 3; j++) {
            if (j == 0) {
                rows[i].insertCell(j).innerHTML = '<img width = "130" src = "' + books[i].image + '">';
            }
            if (j == 1) {
                rows[i].insertCell(j).innerHTML = '<p>' + books[i].info.title +
                    '<br>' + books[i].info.author +
                    '<br>' + books[i].info.year + '</p>';
            }
            if (j == 2) {
                rows[i].insertCell(j).innerHTML = "<button onclick='showEditWin()'>Редактировать</button><button>Удалить</button>";
            }
        }
    }
}


function addBook() {
    showAddBookWin()
}

function showAddBookWin() {

    var darkLayer = document.createElement('div'); // слой затемнения
    darkLayer.id = 'shadow'; // id чтобы подхватить стиль
    document.body.appendChild(darkLayer); // включаем затемнение

    var editWindow = document.createElement('div'); // создание окна добавления книги
    editWindow.id = 'popupWin';
    editWindow.className = 'modalWin';
    editWindow.style.textAlign = 'center'; // стилизация
    editWindow.innerHTML = '<h2> Добавление книги </h2>\n';
    document.body.appendChild(editWindow); // добавление окна

    darkLayer.onclick = function () {  // при клике на слой затемнения все исчезнет
        darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
        editWindow.style.display = 'none'; // делаем окно невидимым
        return false;
    };
}
