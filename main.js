//Creamos el codercalendar
const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

// Inicializamos un arreglo para almacenar las tareas
const tasks = [];

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const text = input.value;

  if (text !== "") {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = text;

    // Agregamos la selección de urgencia
    const urgencySelect = document.createElement("select");
    urgencySelect.innerHTML = `
      <option value="low">Baja</option>
      <option value="medium">Media</option>
      <option value="high">Alta</option>
    `;

    li.appendChild(p);
    li.appendChild(urgencySelect);
    li.appendChild(addDeleteBtn());
    ul.appendChild(li);

    // Almacenamos la tarea en el arreglo
    tasks.push({ text, urgency: urgencySelect.value });

    input.value = "";
    empty.style.display = "none";

    // Ordenamos y actualizamos la lista de tareas
    sortTasksByUrgency();
  }
});

function addDeleteBtn() {
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "X";
  deleteBtn.className = "btn-delete";

  deleteBtn.addEventListener("click", (e) => {
    const item = e.target.parentElement;
    ul.removeChild(item);

    // Eliminamos la tarea del arreglo
    const index = tasks.findIndex((task) => task.text === item.querySelector("p").textContent);
    if (index !== -1) {
      tasks.splice(index, 1);
    }

    if (tasks.length === 0) {
      empty.style.display = "block";
    }
  });

  return deleteBtn;
}

// Función para ordenar las tareas por urgencia
function sortTasksByUrgency() {
  tasks.sort((a, b) => {
    const urgencyOrder = { low: 0, medium: 1, high: 2 };
    return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
  });

  // Limpiamos la lista existente
  ul.innerHTML = "";

  // Volvemos a renderizar las tareas ordenadas
  tasks.forEach((task) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = task.text;

    const urgencySelect = document.createElement("select");
    urgencySelect.innerHTML = `
      <option value="low">Baja</option>
      <option value="medium">Media</option>
      <option value="high">Alta</option>
    `;
    urgencySelect.value = task.urgency;

    li.appendChild(p);
    li.appendChild(urgencySelect);
    li.appendChild(addDeleteBtn());
    ul.appendChild(li);
  });
}

// Llamamos a la función sortTasksByUrgency para renderizar inicialmente las tareas
sortTasksByUrgency();