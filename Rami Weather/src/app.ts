class WeatherApp {
  constructor(private search: HTMLInputElement, public searchTimeOut: any) {
    this.search = search;
    this.search.addEventListener("keyup", this.getWeatherStatus);
  }

  getWeatherStatus(this: WeatherApp, e: any): void | number {
    if (this.searchTimeOut || e.target.value === "") {
      clearTimeout(this.searchTimeOut);
    }

    this.searchTimeOut = setTimeout(() => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=4b84df23aaaae3c3ff6535d1cdc6e1db&units=metric`
      );
      xhr.send();
      xhr.addEventListener("load", () => {
        let container: any = document.querySelector(".card-container");
        const data = JSON.parse(xhr.response);
        try {
          let card = `<div class="card">
          <h2 class="card-title">${data.name}</h2>
          <img title="${
            data.weather[0].description
          }" draggable="false" src="../../assets/${data.weather[0].icon}.svg" />
          <h3>${Math.round(data.main.temp)}&deg;</h3>
          </div>`;
          container.innerHTML = card;
        } catch {
          container.innerHTML = "<h2>no results found</h2>";
        }
      });
    }, 700);
  }
}

const search = <HTMLInputElement>document.querySelector("#Search_Cities")!;
let searchTimeOut;
const cardsContainer = <HTMLElement>document.querySelector(".cards");
const weatherApp = new WeatherApp(search, searchTimeOut);
window.addEventListener("unload", () => (search.value = ""));
