// async function getBackgroundImage() {
//   const response = await fetch(
//     "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
//   );
//   const data = await response.json();
//   console.log(data);

//   document.body.style.backgroundImage = `url("${data.urls.raw}")`;
//   document.getElementById("photograhper").textContent = `By: ${data.user.name}`;
// }
// getBackgroundImage();

//------display time--------
function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}
setInterval(getCurrentTime, 1000);
// setInterval(function () {
//   const date = new Date();
//   let hour = date.getHours();
//   let minute = date.getMinutes();

//   let h = hour < 10 ? "0" + hour : hour;
//   let m = minute < 10 ? "0" + minute : minute;
//   let time = h + ":" + m;
//   document.getElementById("time").textContent = time;
//   console.log(time);
// }, 60000);

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
  });

//------get current crypto values-----
function getCurrentCrypto(url) {
  try {
    fetch(`${url}`)
      .then((res) => {
        console.log(res.status);
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

            <div>👆: ${data.market_data.high_24h.try} TRY</div>
            <div>👇: ${data.market_data.low_24h.try} TRY</div>
        `;
      });
  } catch (err) {
    console.error(err);
  }
}

getCurrentCrypto("https://api.coingecko.com/api/v3/coins/bitcoin");
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
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      document.getElementById(
        "weather"
      ).innerHTML = `<div class="weather-cond"><img src="https://openweathermap.org/img/wn/${
        data.weather[0].icon
      }@2x.png" width="80"/> 
        <span>${Math.round(data.main.temp)}</span>
        </div>
      <div class="location">${data.name}</div>`;
    })
    .catch((err) => console.error(err));
});
