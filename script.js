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
const taskData = [];

let currentTask = {};

// Reveals the form modal when user clicks the "Add new Task" button.
openTaskFormBtn.addEventListener("click", () => {
    taskForm.classList.toggle("hidden")
});

// Reveals the confirmCloseDialog modal when user clicks the closeTaskFormBtn.
closeTaskFormBtn.addEventListener("click", () => {
    confirmCloseDialog.showModal();
});

// Closes the confirmCloseDialog modal when user clicks the cancel button.
cancelBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
});

// Closes the confirmCloseDialog modal and hides the form when user clicks the discard button.
discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
    taskForm.classList.toggle("hidden");
});


taskForm.addEventListener("submit", (e) => {
    // Prevents the browser from refreshing the page after submitting the form.
    e.preventDefault();

    // Determines whether the task being added to the taskData array already exists of not.
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

    
    const taskObj = {
        // Retrieves the value from the title input, converts it to lowercase, and replaces space characters with a hyphen. Adds another hyphen and the date. Stores it as the value of the 'id' property.
        id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value
    }
});