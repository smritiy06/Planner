const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const currentDate = document.getElementById("currentDate");
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
    toggleEmptyState();

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
        toggleEmptyState();

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
            toggleEmptyState();
        });

    }

    updateProgress();

}
function displayDate(){

    const today = new Date();

    const hour = today.getHours();

    let greeting = "";

    if(hour >= 5 && hour < 12){

        greeting = "🌅 Good Morning";

    }
    else if(hour >= 12 && hour < 17){

        greeting = "🌤️ Good Afternoon";

    }
    else if(hour >= 17 && hour < 24){

        greeting = "🌆 Good Evening";

    }

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    currentDate.innerHTML = `
        <strong>${greeting}</strong><br>
        ${"📅 "+ today.toLocaleDateString("en-US", options)}
    `;
    
}

function toggleEmptyState(){

    if(tasks.length === 0){

        emptyState.style.display = "flex";

    }
    else{

        emptyState.style.display = "none";

    }

}
// -------------------- START --------------------

loadTasks();
displayDate();
toggleEmptyState();