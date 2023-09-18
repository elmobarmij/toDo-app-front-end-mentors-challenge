const inputTodo = document.querySelector(".create-todo");
const todoCheckIcon = document.querySelector(".todo-check");
const todosContainer = document.querySelector(".todos-container");

const btnAll = document.querySelector(".btn__all");
const btnActive = document.querySelector(".btn__active");
const btnCompleted = document.querySelector(".btn__completed");
const btnClear = document.querySelector(".btn__clear");

// Toggle Dark Mode
document.getElementById("btnSwitch").addEventListener("click", () => {
  if (document.documentElement.getAttribute("data-bs-theme") == "dark") {
    document.documentElement.setAttribute("data-bs-theme", "light");
    document.querySelector(".mode").setAttribute("src", "img/icon-moon.svg");
    document.body.classList.toggle("active");
  } else {
    document.documentElement.setAttribute("data-bs-theme", "dark");
    document.querySelector(".mode").setAttribute("src", "img/icon-sun.svg");
    document.body.classList.toggle("active");
  }
});

// Create Todo List
const createTodo = function () {
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;

    if (inputTodo.value !== "" && e.key === "Enter") {
      createMarkup(inputTodo.value);
      // back to All todo list
      btnAll.click();
    }
  });

  const createMarkup = function (inp) {
    const html = `
   <div
      class="todo-item position-relative d-flex justify-content-center 
      align-items-center"
    >
      <div
        class="form-control border-bottom-0 create-todo 
        py-8 d-flex align-items-center"
      >
        <span
          class="todo-check ms-4 me-4 cursor-pointer
          rounded-circle border d-flex justify-content-center align-items-center" 
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="9"
            class="d-none justify-items-center align-items-center"
          >
            <path
              fill="none"
              stroke="#FFF"
              stroke-width="2"
              d="M1 4.304L3.696 7l6-6"
            />
          </svg>
        </span>
        <span class="todo fw-bold">${inp}</span>
        
        <svg class="todo-close ms-auto me-4 opacity-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path fill="#494C6B" fill-rule="evenodd" 
        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132
        8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        </div>
      
      </div>
      `;

    inputTodo.value = "";
    todosContainer.insertAdjacentHTML("beforeend", html);

    const countItems = function () {
      const items = document.querySelectorAll(".todo-item");
      numberOfTodos = items.length;
      itemsCounter.forEach((item) => {
        item.textContent = numberOfTodos;
      });
    };

    const checkIcons = document.querySelectorAll(".todo-check");
    const arrayOfTodos = Array.from(checkIcons);
    arrayOfTodos.map((todo) => {
      todo.addEventListener("click", function () {
        todo.classList.add("active");
        todo.parentElement.parentElement.classList.add("active-todo");
        todo.addEventListener("click", function () {
          todo.classList.remove("active");
          todo.parentElement.parentElement.classList.remove("active-todo");
        });
      });
    });

    let numberOfTodos;
    const itemsCounter = document.querySelectorAll(".items-counter");
    const todoItems = Array.from(document.querySelectorAll(".todo-item"));

    const counterElements = document.querySelectorAll(".items-counter");
    counterElements.forEach((el) => countItems(el));

    const closeTodo = function () {
      const closeIcons = document.querySelectorAll(".todo-close");
      closeIcons.forEach((icon) => {
        if (icon === null) return;

        icon.addEventListener("click", function () {
          icon.closest(".todo-item").remove();
          numberOfTodos--;

          todosContainer.children.length === 0
            ? itemsCounter.forEach((item) => {
                item.textContent = 0;
              })
            : countItems();
        });
      });
    };
    closeTodo();

    btnAll.addEventListener("click", function () {
      const items = document.querySelectorAll(".todo-item");
      items.forEach((it) => it.classList.remove("hidden"));
      countItems();
    });

    btnActive.addEventListener("click", function () {
      const activeTodos = todoItems.filter((item) =>
        item.classList.contains("active-todo")
      );

      todoItems.forEach((it) => it.classList.remove("hidden"));
      activeTodos.forEach((el) => {
        el.classList.add("hidden");
      });

      numberOfTodos = todoItems.filter(
        (item) => !item.classList.contains("active-todo")
      ).length;
      itemsCounter.forEach((item) => {
        item.textContent = numberOfTodos;
      });
    });

    btnCompleted.addEventListener("click", function () {
      const notActiveTodos = todoItems.filter(
        (item) => !item.classList.contains("active-todo")
      );
      todoItems.forEach((it) => it.classList.remove("hidden"));
      notActiveTodos.forEach((el) => {
        el.classList.add("hidden");
      });

      numberOfTodos = todoItems.filter((item) =>
        item.classList.contains("active-todo")
      ).length;
      itemsCounter.forEach((item) => {
        item.textContent = numberOfTodos;
      });
    });

    const btnClearBtns = document.querySelectorAll(".btn__clear");
    btnClearBtns.forEach((btn) =>
      btn.addEventListener("click", function () {
        const activeTodos = todoItems.filter((item) =>
          item.classList.contains("active-todo")
        );
        activeTodos.forEach((el) => el.remove());

        numberOfTodos = todoItems.filter((item) =>
          item.classList.contains("active-todo")
        ).length;
        itemsCounter.forEach((item) => {
          item.textContent = numberOfTodos;
        });
        btnAll.click();
      })
    );
  };
};
createTodo();
