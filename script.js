// <div class="task" id="*nazwa*">
//   <h1>*nazwa*</h1>
//   <div class="steps">
//     <ol>
//       <li>
//         Krok <button onclick="delStep()">Usuń krok</button>
//       </li>
//     </ol>
//     <input type="text" id="step*nazwa*" /><button>Dodaj krok</button
//     ><button>Usun task</button>
//   </div>
// </div>

function newTask() {
  let taskName = document.getElementById("taskName").value;

  if (taskName != "" && isNaN(taskName[0])) {
    //task
    let task = document.createElement("div");
    task.className = "task";
    //h1
    let header = document.createElement("h1");
    task.id = taskName;
    header.textContent = taskName;
    task.appendChild(header);
    //div steps
    let steps = document.createElement("div");
    steps.className = "steps";
    task.appendChild(steps);

    // kroki
    const list = document.createElement("ol");
    const listItem = document.createElement("li");
    listItem.innerHTML =
      "Krok  <button onclick='delStep(this.parentNode)'>Usuń krok</button>";
    list.appendChild(listItem);
    steps.appendChild(list);

    //input

    const input = document.createElement("input");
    input.type = "text";
    input.id = "step" + taskName;
    steps.appendChild(input);

    //buttonAddtask

    const addButton = document.createElement("button");
    addButton.textContent = "Dodaj krok";
    addButton.addEventListener("click", function () {
      addStep(taskName);
    });
    steps.appendChild(addButton);

    //del button

    const dellButton = document.createElement("button");
    dellButton.textContent = "Usun task";
    dellButton.addEventListener("click", function () {
      delTask(taskName);
    });
    steps.appendChild(dellButton);

    //dodanie do main diva
    let main = document.querySelector(".main");
    main.appendChild(task);
  } else {
    alert(
      "Zadanie nie moze zaczynać się od cyfry! | Zadanie nie moze byc puste!"
    );
  }
}

function delTask(taskName) {
  let taskBox = document.getElementById(taskName);
  if (taskBox) {
    taskBox.remove();
  } else {
    console.log("diva nie ma: ", taskName);
  }
}

function delStep(stepElement) {
  stepElement.remove();
}

// Funkcja addStep
function addStep(taskName) {
  let list = document.querySelector("#" + taskName + " .steps ol");
  let taskInput = document.getElementById("step" + taskName).value;
  let listItem = document.createElement("li");

  if (taskInput != "" && isNaN(taskInput[0])) {
    listItem.innerHTML =
      taskInput +
      " <button onclick='delStep(this.parentNode)'>Usuń krok</button>";
    list.appendChild(listItem);
  } else {
    alert(
      "Krok zadania nie moze zaczynać się od cyfry! | Krok zadania nie moze byc pusty!"
    );
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function () {
    let content = document.querySelector(".main").innerHTML;
    localStorage.setItem("main", content);
  });
});

function backup() {
  console.log("ez");
  let content = localStorage.getItem("main");
  if (content) {
    document.querySelector(".main").innerHTML = content;
    fixTask();
  }
}

function fixTask() {
  document.querySelectorAll(".task button").forEach((button) => {
    let taskName = button.closest(".task").id;
    if (button.textContent.includes("Usuń krok")) {
      button.onclick = function () {
        delStep(button.parentNode);
      };
    } else if (button.textContent.includes("Dodaj krok")) {
      button.onclick = function () {
        addStep(taskName);
      };
    } else if (button.textContent.includes("Usun task")) {
      button.onclick = function () {
        delTask(taskName);
      };
    }
  });
}
