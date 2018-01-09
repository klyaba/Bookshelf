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
var firstAddFlag = false; // флаг для отделения инициализация от добавления новых книг
var yearFlag = true; // флаг для проверки корректности введенного значения года издания
var noneEmptyFlag = false;

// заполнение таблицы значениями по умолчанию и обработка нажатия табличных кнопок
function init() {

    // заполнение таблицы исходными значениями
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

        var classList = target.className.split(/\s+/);

        for (var i = 0; i < classList.length; i++) {
            switch (classList[i]) {
                case 'del-btn' :
                    deleteBook(row.rowIndex);
                    break;
                case "edit-btn" :
                    showEditForm(row.rowIndex);
                    break;
            }
        }

    }
}

// функция лобавления новой книги
function addBook(book, index) {

    // добавление в мамссив
    if (firstAddFlag) {
        // books.splice(index, 0, book);
        books.push(book);
    }

    // добавление в таблицу
    var row = document.getElementById('bookTable').insertRow(index);
    row.insertCell(0).innerHTML = '<img class="table_image" src = "' + books[index].image + '">';
    row.insertCell(1).innerHTML = '<p class = "table_text title"><span class="table_text_title">' + books[index].info.title + '</span></p>' +
        '<p class = "table_text author">' + books[index].info.author + '</p>' +
        '<p class = "table_text year">' + books[index].info.year + ' г.</p>';
    row.insertCell(2).innerHTML = "<button class='button table_button edit-btn'>Редактировать</button>\n<button class='button table_button del-btn'>Удалить</button>";

}

// функция редактирования существующей книги
function editBook(book, index) {

    // вставка новых значений в массив
    books.splice(index, 1, book);

    // вставка новых значений в таблицу
    var row = document.getElementById("bookTable").childNodes[index];
    row.cells[0].firstChild.src = book.image;
    row.cells[1].getElementsByClassName("title")[0].innerHTML = '<span class="table_text_title">' + book.info.title + '</span>';
    row.cells[1].getElementsByClassName("author")[0].innerHTML = book.info.author;
    row.cells[1].getElementsByClassName("year")[0].innerHTML = book.info.year + ' г.';

    return false;
}

// функция удаления книги
function deleteBook(index) {
    document.getElementById('bookTable').deleteRow(index);
    books.splice(index, 1);
}

// вывод формы редактирования
function showEditForm(rowNumber) {
    showForm(rowNumber);

    document.getElementById("new-title").value = books[rowNumber].info.title;
    document.getElementById("new-author").value = books[rowNumber].info.author;
    document.getElementById("new-year").value = books[rowNumber].info.year;
    document.getElementById("new-image").value = books[rowNumber].image;

    var book;
    var saveButton = document.getElementById("save-btn");

    saveButton.addEventListener("click", function () {
        if (yearFlag) {
            book = getChangeBook();
            editBook(book, rowNumber);
            closeForm();
        }
        else {
            alert("Введите корректный год!");
        }
    })
}

// вывод формы добавления
function showAddForm() {
    showForm(-1);

    var book;
    var saveButton = document.getElementById("save-btn");
    saveButton.addEventListener("click", function () {
        if (yearFlag) {
            // if (noneEmptyFlag) {
                firstAddFlag = true;
                book = getChangeBook();
                addBook(book, books.length);
                closeForm();
            // }
            // else {
            //     alert("Заполните все строки");
            // }
        }
        else {
            alert("Введите корректный год!");
        }
    })
}

function showForm(rowNumber) {
    document.getElementById("bookTable").style.display = "none";
    document.getElementById("add-btn").style.display = "none";

    var editType;

    editType = rowNumber >= 0 ? 'Редактирование' : 'Добавление';

    // setDarkLayer();

    form = document.createElement('div'); // создание формы
    // form = document.getElementById("form");
    form.id = 'popupWin';
    form.className = 'form';
    form.innerHTML = '<h2 class="form_name">' + editType + ' книги</h2>' +
        '<p class="form_text">Наименование</p>' +
        '<input id = "new-title" class = "form_field">' +
        '<p class="form_text">Автор</p>' +
        '<input id = "new-author" class = "form_field">' +
        '<p class="form_text">Год выпуска</p>' +
        '<input type="number" id = "new-year" class = "form_field form_field_year" onchange="checkYear(this.value)">' +
        '<p class="form_text">Изображение</p>' +
        '<input id = "new-image" class = "form_field" >' +
        '<br><input type = "button" class="button form_button" value = "Сохранить" id = "save-btn">' +
        ' <button id = "cancel-btn" class = "button form_button" onclick="closeForm()">Отменить</button>'
    ;
    document.body.appendChild(form); // добавление формы на страницу

    // var saveButton = document.getElementById("save-btn");
    // saveButton.addEventListener("click", function () {
    //     var fields = document.getElementsByClassName("form_field");
    //     noneEmptyFlag = fields.every(isEmpty);
    //     alert(noneEmptyFlag);
    // })

    return false;
}


function isEmpty(str) {
    if (str) {
        // noneEmptyFlag = false;
        // alert('Заполните все строки');
        return true;
    }
    else {
        // noneEmptyFlag = true;
        return false;
    }
}

function checkYear(year) {
    if (year < 2018) {
        yearFlag = true;
    } else {
        yearFlag = false;
        alert("Год издания не может превышать 2017");
    }
}

// получение книги из формы
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

function closeForm() {
    document.getElementById("bookTable").style.display = "block";
    document.getElementById("add-btn").style.display = "block";
    // darkLayer.parentNode.removeChild(darkLayer); // удаляем затемнение
    form.parentNode.removeChild(form); // удаление окна
    return false;
}