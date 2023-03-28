// Задание 4
// Реализовать функционал мини таск-менеджера.
// Функционально должно работать так: https://ucarecdn.com/a2aeaed4-...
// Затем стилизовать (написать CSS) на свое усмотрение.

// ПОСЛЕДОВАТЕЛЬНОСТЬ РАБОТЫ:
// 1) Описать в html форму с полем input и кнопкой отправки формы. Под формой предусмотреть пустой список ul.
// 2) На событие отправки формы добавлять в список ul элемент li со значением инпута. Сам инпут при этом очищать.
// 3) Внутри добавляющегося li перед текстом должен также добавляться чекбокс.
// Для добавления элемента внутрь в начало используйте метод element.prepend(element).
// 4) При отметке чекбокса задача должна перечеркиваться (становиться выполненной) и перемещаться вниз списка. Если отметку снять - перечеркивание убирается и задача помещается в начало списка.
// Отмеченный чекбокс - js-свойство .checked
// Перечеркнутый текст - CSS-свойство text-decoration: line-through
// 5) К каждой задаче добавить кнопку для удаления, реализовать само удаление.
// Для удаления элементов используется метод element.remove().
// 6) Пропишите CSS, чтобы ваш таск-менеджер выглядел получше: уберите маркеры у списка, оформите кнопки.

const input = document.getElementById("input");
const submit = document.getElementById("submit-btn");
const listValue = document.getElementById("todo-list");
const form = document.querySelector(".form-todo");
const checkAll = document.getElementById("checkAll-btn");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const li = createLi(input.value);
    const checkbox = createCheckbox();
    const removeBtn = createXBtn();
    li.appendChild(removeBtn);
    li.prepend(checkbox);               //prepend - to add element to the beginning of parent-el
    listValue.appendChild(li);
    saveAllTasks();
    input.value = "";
    removeBtn.addEventListener("click", () => {
        removeBtn.parentElement.remove();
    })
    checkbox.addEventListener("click", (event)=>{
        ifChecked(event);
    })
    
})


checkAll.addEventListener("click", () => {
    const liList = document.querySelectorAll("#todo-list li");
    const checkList = document.querySelectorAll(".checkbox");
    liList.forEach(li => {
        li.style.textDecoration = "line-through";
    })
    checkList.forEach(checkbox => {
        checkbox.checked = true;
    })
    localStorage.clear();
});



//functions
function createLi (innerText) {
    const li = document.createElement("li");
    li.innerText = innerText;
    return li;
};

const createCheckbox = () => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    return checkbox;
};

const createXBtn = () => {
    const removeBtn = document.createElement("div");
    removeBtn.classList.add("close-out");
    const xIcon = document.createElement("i");
    xIcon.classList.add("fa-solid");
    xIcon.classList.add("fa-xmark");
    removeBtn.appendChild(xIcon);
    return removeBtn;
};

const ifChecked = (event) => {
    let liCheckbox = event.target.parentElement;
    if (event.target.checked === true ){
        liCheckbox.style.textDecoration = "line-through";
        liCheckbox.remove();
        listValue.appendChild(liCheckbox);
        
    } else {
        liCheckbox.style.textDecoration = "none";
        listValue.insertBefore(liCheckbox, listValue.firstChild);       
    }
};

//localStorage
const saveAllTasks = () => {
    const liList = document.querySelectorAll("#todo-list li");
    for (let i = 0; i < liList.length; i++){
        localStorage.setItem("task" + i, liList[i].innerText);
    }
};

const createAllTasks = () => {
    const liList = document.querySelectorAll("#todo-list li");
    console.log(Object.entries(localStorage));                        //Object.entries(localStorage) - array of arrays[key,value] from localStorage
    const storageArr = Object.entries(localStorage);
    storageArr.sort();
    console.log(storageArr);
    storageArr.forEach(arrTask => {
        console.log(arrTask);
        const li = createLi("");
        li.innerText = arrTask[1];
        const checkbox = createCheckbox();
        const removeBtn = createXBtn();
        li.appendChild(removeBtn);
        li.prepend(checkbox);               
        listValue.appendChild(li);
        removeBtn.addEventListener("click", () => {
            removeBtn.parentElement.remove();
        })
        checkbox.addEventListener("click", (event)=>{
            ifChecked(event);
        })
    })
};
createAllTasks();