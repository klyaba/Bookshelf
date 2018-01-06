// Книги по умолчанию
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
    // Таблица по умолчанию
    var table = document.getElementById('bookTable');
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
                rows[i].insertCell(j).innerHTML = "<button class='edit-btn'>Редактировать</button><button class='del-btn'>Удалить</button>";
            }
        }
    }

    //обработка нажатия кнопок в таблице
    table.onclick = function (event) {
        event = event || window.event;
        var target = event.target || event.srcElement;

        //кнопка удаления книги
        if (target.className == 'del-btn') {
            var row = target.parentNode.parentNode;
            this.deleteRow(row.rowIndex);
        }

        //кнопка редактирования книги
        if (target.className == 'edit-btn') {

        }
    }
}

function addBook() {
    //Добавление книги в массив
    books[books.length] = {
        "image": document.getElementById('add-image').value,
        "info": {
            "title": document.getElementById("add-title").value,
            "author": document.getElementById("add-author").value,
            "year": document.getElementById("add-year").value
        }
    }

    // Добавление строки в таблицу
    var table = document.getElementById('bookTable');
    var newRow = table.insertRow(-1);
    for (var j = 0; j < 3; j++) {
        if (j == 0) {
            newRow.insertCell(j).innerHTML = '<img width = "130" src = "' + document.getElementById('add-image').value + '">';
        }
        if (j == 1) {
            newRow.insertCell(j).innerHTML = '<p>' + books[books.length - 1].info.title +
                '<br>' + books[books.length - 1].info.author +
                '<br>' + books[books.length - 1].info.year + '</p>';
        }
        if (j == 2) {
            newRow.insertCell(j).innerHTML = "<button>Редактировать</button><button class='del-btn'>Удалить</button>";
        }
    }
}

function showAddBookForm() {

    var darkLayer = document.createElement('div'); // слой затемнения
    darkLayer.id = 'shadow'; // id чтобы подхватить стиль
    darkLayer.className = "temporary";
    document.body.appendChild(darkLayer); // затемнение фона

    var addForm = document.createElement('div'); // создание окна добавления книги
    addForm.id = 'popupWin';
    addForm.className = 'modalWin';
    addForm.innerHTML = '<h2> Добавление книги </h2>' +
        '<p>Наименование</p>' +
        '<input id = "add-title">' +
        '<p>Автор</p>' +
        '<input id = "add-author">' +
        '<p>Год выпуска</p>' +
        '<input id = "add-year">' +
        '<p>Изображение</p>' +
        '<input id = "add-image">' +
        '<br><input type="button" value = "Добавить" id = "add-btn" class = "temporary">' +
        ' <button id = "cancel-btn" class = "temporary">Отмена</button>'
    ;
    document.body.appendChild(addForm); // добавление формы

    // Обработка клика на фоне или кнопках формы
    var temporary = document.getElementsByClassName("temporary");
    [].forEach.call(temporary, function (el) {
        el.onclick = function () {
            if (el.id == "add-btn") {
                addBook();
            }
            darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
            addForm.parentNode.removeChild(addForm); // удаление окна
            return false;
        }
    });

}

