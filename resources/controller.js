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
var firstAddFlag = false, yearFlag = true;

function init() {

    for (var i = 0; i < books.length; i++) {
        addBook(books[i], i);
    }

    firstAddFlag = true;

    var table = document.getElementById("bookTable");
    //обработка нажатия кнопок в таблице
    table.onclick = function (event) {
        event = event || window.event;
        var target = event.target || event.srcElement;
        var row = target.parentNode.parentNode;

        //кнопка удаления книги
        if (target.className == 'del-btn') {
            deleteBook(row.rowIndex);
        }

        //кнопка редактирования книги
        if (target.className == 'edit-btn') {
            showEditForm(row.rowIndex);
        }
    }
}

function addBook(book, index) {

    if (firstAddFlag) {
        // books.splice(index, 0, book);
        books.push(book);
    }

    var row = document.getElementById('bookTable').insertRow(index);
    row.insertCell(0).innerHTML = '<img width = "130" src = "' + books[index].image + '">';
    row.insertCell(1).innerHTML = '<p class = "title">' + books[index].info.title + '</p>' +
        '<p class = "author">' + books[index].info.author + '</p>' +
        '<p class = "year">' + books[index].info.year + '</p>';
    row.insertCell(2).innerHTML = "<button class='edit-btn'>Редактировать</button><button class='del-btn'>Удалить</button>";

}

function editBook(book, index) {

    books.splice(index, 1, book);

    var row = document.getElementById("bookTable").childNodes[index];
    row.cells[0].firstChild.src = book.image;
    row.cells[1].getElementsByClassName("title")[0].innerHTML = book.info.title;
    row.cells[1].getElementsByClassName("author")[0].innerHTML = book.info.author;
    row.cells[1].getElementsByClassName("year")[0].innerHTML = book.info.year;

    return false;
}

function deleteBook(index) {
    document.getElementById('bookTable').deleteRow(index);
    books.splice(index, 1);
}

function showEditForm(rowNumber) {
    showForm(rowNumber);

    document.getElementById("new-title").value = books[rowNumber].info.title;
    document.getElementById("new-author").value = books[rowNumber].info.author;
    document.getElementById("new-year").value = books[rowNumber].info.year;
    document.getElementById("new-image").value = books[rowNumber].image;

    var book;
    var saveButton = document.getElementById("save-btn");

    // if (yearFlag) {
    //     saveButton.setAttribute("class", "temporary");
    //     book = getChangeBook();
    //     saveButton.addEventListener("click", function () {
    //         editBook(book, rowNumber)
    //     });
    // }
    // else {
    //     saveButton.addEventListener("click", function () {
    //         alert ("Введите корректный год!")
    //     });
    // }

    saveButton.addEventListener("click", function () {
        if (yearFlag) {
            book = getChangeBook();
            editBook(book, rowNumber);
            closeForm();
        }
        else {
            alert ("Введите корректный год!");
        }
    })
}


// function isEmpty(str) {
//     if (str.trim() == '')
//         return true;
//
//     return false;
// }

function showAddForm() {
    showForm(-1);

    var book;
    var saveButton = document.getElementById("save-btn");
    saveButton.addEventListener("click", function () {
        firstAddFlag = true;
        book = getChangeBook();
        addBook(book, books.length);
        closeForm();
    })
}

function showForm(rowNumber) {

    var editType;

    editType = rowNumber >= 0 ? 'Редактирование' : 'Добавление';

    setDarkLayer();

    form = document.createElement('div'); // создание формы
    form.id = 'popupWin';
    form.className = 'modalWin';
    form.innerHTML = '<h2>' + editType + ' книги</h2>' +
        '<label id="errors"></label>' +
        '<p>Наименование</p>' +
        '<input id = "new-title" class = "new">' +
        '<p>Автор</p>' +
        '<input id = "new-author" class = "new">' +
        '<p>Год выпуска</p>' +
        '<input type="number" id = "new-year" class = "new" onchange="checkYear(this.value)">' +
        '<p>Изображение</p>' +
        '<input id = "new-image" class = "new">' +
        '<br><input type = "button" value = "Сохранить" id = "save-btn">' +
        ' <button id = "cancel-btn" class = "temporary">Отменить</button>'
    ;
    document.body.appendChild(form); // добавление формы на страницу

    var temporary = document.getElementsByClassName("temporary");
    [].forEach.call(temporary, function (el) {
        el.addEventListener("click", closeForm)
    });

    return false;
}

function checkYear(year) {
    if (year < 2018) {
        yearFlag = true;
    }     else {
        yearFlag = false;
        alert("Год издания не может превышать 2017");
    }
}

function getChangeBook() {
    var book = {
        "image": document.getElementById("new-image").value,
        "info": {
            title: document.getElementById("new-title").value,
            author: document.getElementById("new-author").value,
            year: document.getElementById("new-year").value
        }
    }
    return book;
}

function setDarkLayer() {
    darkLayer = document.createElement('div'); // слой затемнения
    darkLayer.id = 'shadow'; // id чтобы подхватить стиль
    darkLayer.className = "temporary";
    document.body.appendChild(darkLayer); // затемнение фона
    return false;
}

function closeForm() {
    darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
    form.parentNode.removeChild(form); // удаление окна
    return false;
}