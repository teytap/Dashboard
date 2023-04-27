//------display time--------
// function getCurrentTime() {
//   const date = new Date();
//   document.getElementById("time").textContent = date.toLocaleTimeString(
//     "en-us",
//     { timeStyle: "short" }
//   );
// }
// setInterval(getCurrentTime, 1000);
setInterval(function () {
  const date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let h = hour < 10 ? "0" + hour : hour;
  let m = minute < 10 ? "0" + minute : minute;
  let time = h + ":" + m;
  document.getElementById("time").textContent = time;
}, 1000);

//------get background image-------
fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url("${data.urls.full}")`;
    document.getElementById(
      "photograhper"
    ).textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    console.log(err);
    document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1503614472-8c93d56e92ce?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODE4OTcwMzc&ixlib=rb-4.0.3&q=85")`;
    document.body.style.backgroundColor = "grey";
  });

//------get current crypto values-----
function getCurrentCrypto(url) {
  try {
    fetch(`${url}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        document.getElementById("crypto").innerHTML += `
        <div class="crypto-data"><img src="${data.image.small}"class="btc-img" width="26"/><span>  ${data.name} </span>
        </div>
        `;
        document.getElementById("crypto").innerHTML += `

            <div>⬆: ${data.market_data.high_24h.try} TRY</div>
            <div>⬇: ${data.market_data.low_24h.try} TRY</div>
        `;
      });
  } catch (err) {
    console.error(err);
  }
}

//getCurrentCrypto("https://api.coingecko.com/api/v3/coins/bitcoin");
getCurrentCrypto("https://api.coingecko.com/api/v3/coins/dogecoin");

//--------get weather----------

navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        document.getElementById(
          "weather"
        ).innerHTML = ` <div class="loader"></div>`;
        throw Error();
      }
      return res.json();
    })
    .then((data) => {
      document.getElementById(
        "weather"
      ).innerHTML = `<div class="weather-cond"><img src="https://openweathermap.org/img/wn/${
        data.weather[0].icon
      }@2x.png" width="80"/> 
        <span>${Math.round(data.main.temp)}º</span>
        </div>
      <div class="location">${data.name}</div>`;
    })
    .catch((err) => console.error(err));
});
//----get inpiration quotes----

fetch("https://api.goprogram.ai/inspiration")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById(
      "inspiration"
    ).innerHTML = `"${data.quote}" ${data.author}`;
  });
// -----todo list-----

let todoArray;

let localTaskValues = JSON.parse(localStorage.getItem("localTask"));
if (localStorage.getItem("localTask")) {
  todoArray = JSON.parse(localStorage.getItem("localTask"));
} else {
  todoArray = [];
}

function renderTodo() {
  const todoList = document.getElementById("to-do-list");
  let todoHtml = "";
  for (task of localTaskValues) {
    todoHtml += `<li>
        <span class="todo-item ${localTaskValues.indexOf(
          task
        )}" data-todo="${localTaskValues.indexOf(task)}">${task}</span>
        <span class="material-symbols-outlined btn check-btn" id="check-btn"  data-todo="${localTaskValues.indexOf(
          task
        )}">
check
</span>
<span class="material-symbols-outlined btn" id="delete-btn" data-todo="${localTaskValues.indexOf(
      task
    )}">
delete
</span>
      
        
      </li>`;
  }
  todoList.innerHTML = todoHtml;
}

document.addEventListener("click", (e) => {
  //-----open/close todo list-----
  if (e.target.id === `todos`) {
    document.getElementById("todo-container").classList.toggle("hide");
    renderTodo();
  }
  //-----add button-----
  if (e.target.id === `add-btn`) {
    e.preventDefault();
    const taskInput = document.getElementById("task-input").value;
    if (taskInput) {
      todoArray.push(taskInput);
      localStorage.setItem("localTask", JSON.stringify(todoArray));
      localTaskValues = JSON.parse(localStorage.getItem("localTask"));
      renderTodo();
    } else {
      console.log("please write something");
    }
    renderTodo();
  }
  //-----check button-----
  if (e.target.id === `check-btn`) {
    const todoItems = document.getElementsByClassName("todo-item");
    const targetTodo = Object.values(todoItems).filter((item) => {
      return item.dataset.todo === e.target.dataset.todo;
    });

    targetTodo[0].classList.toggle("done");
  }
  //-----delete button-----
  if (e.target.id === `delete-btn`) {
    const todoItems = document.getElementsByClassName("todo-item");
    const targetTodo = Object.values(todoItems).filter((item) => {
      return item.dataset.todo === e.target.dataset.todo;
    });
    const index = todoArray.indexOf(targetTodo[0].innerText);
    if (index > -1) {
      todoArray.splice(index, 1);
    }

    localStorage.setItem("localTask", JSON.stringify(todoArray));
    localTaskValues = JSON.parse(localStorage.getItem("localTask"));
    renderTodo();
  }
});
