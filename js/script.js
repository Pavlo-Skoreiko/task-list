{
  let tasks = [];
  let hideDoneTasks = false;

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const allTasksEvent = () => {
    const allTasksDone = document.querySelectorAll(".js-markAllTasksDone");

    allTasksDone.forEach((allTasksDone, taskIndex) => {
      allTasksDone.addEventListener("click", () => {
        markAllTasksDone(taskIndex);
      });
    });
  };

  const hideShowDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const hideShowDoneTasksEvents = () => {
    const hideShowDoneTasksButton = document.querySelector(".js-hideShowDoneTasksButton");

    if (hideShowDoneTasksButton) {
      hideShowDoneTasksButton.addEventListener("click", hideShowDoneTasks);
    }
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li class="note ${task.done && hideDoneTasks ? "js-note__hideShowDoneTask" : ""} js-taskList">
          <button class="note__button note__button--done js-done">
               ${task.done ? "✔" : ""}
          </button>
          <span class="note__taskName 
               ${task.done ? " note__taskName--done" : ""}"
              >
               ${task.content}
          </span>
          <button class="note__button js-remove">
          🗑
          </button>
      </li >`;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString = `
     <button class="js-hideShowDoneTasksButton">
           ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
     </button>
     <button class="tasks__buttons js-markAllTasksDone" 
           ${tasks.every(({ done }) => done) ? "disabled" : ""}>
     Ukończ wszystkie
     </button>
     `;
    }
    document.querySelector(".js-tasklist").innerHTML = htmlString;
  };

  const render = () => {
    renderTasks();
    renderButtons();
    allTasksEvent();
    hideShowDoneTasksEvents();
    bindRemoveEvents();
    bindToggleDoneEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
