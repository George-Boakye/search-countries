let div1 = document.getElementById("ten-countries");
let main = document.getElementById("main");
let userInput = document.getElementById("country");
let form = document.getElementById("form");
let countryName = document.getElementById("name");
let region = document.getElementById("region");
let capital = document.getElementById("capital");
let img = document.getElementById("img");

async function tenCountries() {
  try {
    let resolvedPromise = await fetch("https://restcountries.com/v3.1/all");
    let promiseInJSON = await resolvedPromise.json();
    let countries = promiseInJSON.slice(0, 11);
    renderTenCountries(countries);
  } catch (error) {
    console.log(error);
  }
}

tenCountries();

function renderTenCountries(arrayOfCountries) {
  arrayOfCountries.forEach((element) => {
    div1.innerHTML += `
    <div>
    <p>Name: ${element.name.official}</p>
    <img src=${element.flags.png} alt="">
    <p>Region: ${element.region}</p>
    <p>Capital: ${element.capital[0]}</p>
    </div>`;
  });
}

async function fetchCountry() {
  let input = userInput.value.trim().toLowerCase();
  try {
    let countrySearched = await fetch(
      `https://restcountries.com/v3.1/name/${input}`
    );
    let countrySearchedInJSon = await countrySearched.json();
    console.log(userInput.value);
    renderCountry(countrySearchedInJSon);
  } catch (error) {
    console.log(error);
  }
}

function renderCountry(countryData) {
  console.log(countryData);
  countryData.forEach((element) => {
    countryName.innerHTML = `<strong>Name</strong>: ${element.name.official}`;
    img.src = `${element.flags.png}`;
    region.innerHTML = `<strong>Region</strong>: ${element.region}`;
    capital.innerHTML = `<strong>Capital</strong>: ${element.capital}`;
  });
}

form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  fetchCountry();
  main.style.display = "block";
});

// `<h1>Country Details</h1>
//     <figure id="figure">
//         <img id="img" src= ${element.flags.png} alt="">
//     </figure>
//     <div class="details">
//         <p id="name"><strong>Name</strong>: ${element.name.official}</p>
//         <p id="region"><strong>Region</strong>: ${element.region}</p>
//         <p id="capital"><strong>Capital</strong>: ${element.capital}</p>
//     </div>`
