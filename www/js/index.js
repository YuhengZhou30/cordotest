document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    init();
    loadTaskList();
}

function init() {
    $(".custom-button").click(addTask);
    $("#taskList").on("click", ".delete", deleteEle);
    $("#taskList").on("click", ".edit", editTask); // Afegir un event listener per a l'edició
}

function deleteEle() {
    var listItem = $(this).closest("li");
    listItem.remove();
    saveTaskList();
}

function addTask() {
    var taskName = prompt("Ingrese el nombre de la tarea:");
    if (taskName) { // Verificar que l'usuari no ha cancel·lat la caixa de diàleg
        var newelem = $("<li>" + taskName + "<button class='edit'>Edit</button><button class='delete'>X</button></li>");
        $("#taskList").append(newelem).listview("refresh");
        saveTaskList();
    }
}

function editTask() {
    var listItem = $(this).closest("li");
    var currentTaskName = listItem.text().trim();
    var newTaskName = prompt("Edit task:", currentTaskName.slice(0, -5));

    if (newTaskName !== null) { // Verificar que l'usuari no ha cancel·lat la caixa de diàleg
        listItem.html(newTaskName + "<button class='edit'>Edit</button><button class='delete'>X</button>");
        saveTaskList();
    }
}

function saveTaskList() {
    var taskList = $("#taskList").html();
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

function loadTaskList() {
    var storedTaskList = localStorage.getItem("taskList");
    if (storedTaskList) {
        $("#taskList").html(JSON.parse(storedTaskList));
    }
}
