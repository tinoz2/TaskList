const input = document.getElementById("input");
const addBtn = document.getElementById("btn-add");
const ul = document.getElementById("ul");
const empty = document.getElementById("empty");


window.addEventListener("load", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    if (tasks.length > 0) {
        tasks.forEach(taskText => {
            const li = createTaskElement(taskText);
            ul.appendChild(li);
        });
        empty.style.display = "none";
    }
});

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const text = input.value;

    if (text !== "") {
        const li = createTaskElement(text);
        ul.appendChild(li);
        input.value = "";
        empty.style.display = "none";

        saveTaskToLocalStorage(text);
    }
});

function createTaskElement(text) {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = text;

    li.appendChild(p);
    li.appendChild(addDeleteBtn());

    return li;
}

function addDeleteBtn() {
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "X";
    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener("click", (e) => {
        const item = e.target.parentElement;
        ul.removeChild(item);

        const taskText = item.querySelector("p").textContent;
        removeTaskFromLocalStorage(taskText);

        const items = document.querySelectorAll("li");

        if (items.length === 0) {
            empty.style.display = "block";
        }
    });

    return deleteBtn;
}

function saveTaskToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

const vaciar = document.getElementById("vaciar");
vaciar.addEventListener("click", vaciarTareas);

function vaciarTareas(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    
                    localStorage.clear();
                    ul.innerText = ""
                    empty.style.display = "block";
                
            }
        })
}
