// In this project, you will learn how localStorage works in JavaScript by building a Todo app. LocalStorage is a web storage feature of JavaScript that lets you persist data by storing the data as a key:value pair.

// Elements
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// This array will store all the tasks along with their associated data, including title, due date, and description.
const taskData = JSON.parse(localStorage.getItem("data")) || [];

let currentTask = {};

const addOrUpdateTask = () => {
    addOrUpdateTaskBtn.innerText = "Add Task";

    // Determines whether the task being added to the taskData array already exists of not.
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

    
    const taskObj = {
        // Retrieves the value from the title input, converts it to lowercase, and replaces space characters with a hyphen. Adds another hyphen and the date. Stores it as the value of the 'id' property.
        id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value
    }

    // Adds the taskObj to the beginning of the taskData array, if the array does not already exist.
    if (dataArrIndex === -1) {
        taskData.unshift(taskObj);
    } else {
        taskData[dataArrIndex] = taskObj;
    }

    localStorage.setItem("data", JSON.stringify(taskData));

    updateTaskContainer();
    reset();
};

const updateTaskContainer = () => {
    tasksContainer.innerHTML = "";
    taskData.forEach(({id, title, date, description}) => {
        (tasksContainer.innerHTML += `
            <div class="task" id="${id}">
                <p><strong>Title:</strong> ${title}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Description:</strong> ${description}</p>
                <button type="button" class="btn" onclick="editTask(this)">Edit</button>
                <button type="button" class="btn" onclick="deleteTask(this)">Delete</button>
            </div>
            `)
        }
    );
};

const deleteTask = (buttonEl) => {
    // Finds the index of the task the user wants to delete.
    const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);

    buttonEl.parentElement.remove();
    taskData.splice(dataArrIndex, 1);
    localStorage.setItem("data", JSON.stringify(taskData));
};

const editTask = (buttonEl) => {
    // Finds the index of the task to be edited.
    const dataArrIndex = taskData.findIndex((item) => item.id === buttonEl.parentElement.id);

    currentTask = taskData[dataArrIndex];

    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date,
    descriptionInput.value = currentTask.description;

    addOrUpdateTaskBtn.innerText = "Update Task";

    taskForm.classList.toggle("hidden");
};

// Resets the input fields.
const reset = () => {
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";

    // Reveals the form and clears currentTask array with current tasks the user has inputed.
    taskForm.classList.toggle("hidden");
    currentTask = {};
}

if (taskData.length) {
    updateTaskContainer();
}

// Reveals the form modal when user clicks the "Add new Task" button.
openTaskFormBtn.addEventListener("click", () => {
    taskForm.classList.toggle("hidden")
});

// Reveals the confirmCloseDialog modal when user clicks the closeTaskFormBtn.
closeTaskFormBtn.addEventListener("click", () => {
    const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;

    const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;

    if (formInputsContainValues && formInputValuesUpdated) {
        confirmCloseDialog.showModal();
    } else {
        reset();
    }
});

// Closes the confirmCloseDialog modal when user clicks the cancel button.
cancelBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
});

// Closes the confirmCloseDialog modal and hides the form when user clicks the discard button.
discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
    reset();
});


taskForm.addEventListener("submit", (e) => {
    // Prevents the browser from refreshing the page after submitting the form.
    e.preventDefault();

    addOrUpdateTask();
});