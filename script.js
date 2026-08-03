const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");

addBtn.addEventListener("click", addTask);

function addTask(){

    const taskText = input.value.trim();

    if(taskText === ""){
        return;
    }

    const task = document.createElement("div");
    task.className = "task";

    task.innerHTML = `
        <input type="checkbox">

        <span>${taskText}</span>

        <div class="actions">
            <button>✏️</button>
            <button>🗑️</button>
        </div>
    `;

    taskList.appendChild(task);

    input.value = "";
}