const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

let tasks = [];

// -------------------- ADD TASK --------------------

addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

function addTask(){

    const taskText = input.value.trim();

    if(taskText === "") return;

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);

    createTaskElement(task);

    updateProgress();

    saveTasks();

    input.value = "";

}

// -------------------- CREATE TASK --------------------

function createTaskElement(task){

    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    taskDiv.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""}>

        <span class="${task.completed ? "completed" : ""}">
            ${task.text}
        </span>

        <div class="actions">
            <button class="edit">✏️</button>
            <button class="delete">🗑️</button>
        </div>
    `;

    const checkbox = taskDiv.querySelector("input");
    const span = taskDiv.querySelector("span");
    const editBtn = taskDiv.querySelector(".edit");
    const deleteBtn = taskDiv.querySelector(".delete");

    // COMPLETE

    checkbox.addEventListener("change", function(){

        task.completed = checkbox.checked;

        span.classList.toggle("completed");

        updateProgress();

        saveTasks();

    });

    // EDIT

    editBtn.addEventListener("click", function(){

        const newText = prompt("Edit task", task.text);

        if(newText && newText.trim() !== ""){

            task.text = newText.trim();

            span.textContent = task.text;

            saveTasks();

        }

    });

    // DELETE

    deleteBtn.addEventListener("click", function(){

        taskDiv.remove();

        tasks = tasks.filter(t => t !== task);

        updateProgress();

        saveTasks();

    });

    taskList.appendChild(taskDiv);

}

// -------------------- PROGRESS --------------------

function updateProgress(){

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const percentage = total === 0 ? 0 : (completed / total) * 100;

    progressBar.style.width = percentage + "%";

    progressText.textContent =
        `${completed} out of ${total} tasks completed`;
        progressPercent.textContent = Math.round(percentage) + "%";

}

// -------------------- STORAGE --------------------

function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function loadTasks(){

    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if(storedTasks){

        tasks = storedTasks;

        tasks.forEach(task => {

            createTaskElement(task);

        });

    }

    updateProgress();

}

// -------------------- START --------------------

loadTasks();