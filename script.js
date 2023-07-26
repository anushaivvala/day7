// Function to fetch the data from the REST countries API
async function fetchData() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
}

// Function to filter countries from the Asia continent/region
function getAsiaCountries(countries) {
    var countriesDatas = countries.filter(country => country.region === "Asia");
    return countriesDatas.map((country)=>`continent : ${country.region} - region : ${country.region} - country : ${country.name.common}`) 
      // console.log(ans1);
}

// Function to filter countries with population less than 2 lakhs
function getCountriesWithPopulationLessThan2Lakhs(countries) {
    var populations = countries.filter(country => country.population < 200000);
    return populations.map((country)=>`continent : ${country.region} - region : ${country.region} - country : ${country.name.common}`) 

}

// Function to print the name, capital, and flag of each country
function printCountryDetails(countries) {
    const detailsContainer = document.getElementById("countryDetails");
    countries.forEach(country => {
        const countryInfo = document.createElement("div");
        countryInfo.innerHTML = `<h3>CountryName:${country.name.common}</h3>
                                <p>Capital: ${country.capital} <br> Flag: </p>
                                <img src="${country.flags.png}" alt="${country.name.common} Flag" width="100px"/>`;
        detailsContainer.appendChild(countryInfo);
    });
}

// Function to calculate the total population of countries
function getTotalPopulation(countries) {
    return countries.reduce((totalPopulation, country) => totalPopulation + country.population, 0);
}

// Function to get countries using US Dollars as currency
function getCountriesWithUSDollarCurrency(countries) {
    var curriens =  countries.filter(country => country.currencies && country.currencies.USD);
        return curriens.map((country)=>`continent : ${country.region} - region : ${country.region} - country : ${country.name.common}`) 

}

// Main function to execute the tasks and display the results on the HTML page
async function main() {
    const countriesData = await fetchData();
    const asiaCountries = getAsiaCountries(countriesData);
    const countriesWithPopulationLessThan2Lakhs = getCountriesWithPopulationLessThan2Lakhs(countriesData);
    const totalPopulation = getTotalPopulation(countriesData);
    const usDollarCountries = getCountriesWithUSDollarCurrency(countriesData);

    // Displaying the results on the HTML page
    document.getElementById("asiaCountries").innerHTML = `<h2>Asia Countries:</h2> <pre>${JSON.stringify(asiaCountries, null, 2)}</pre>`;
    document.getElementById("populationLessThan2Lakhs").innerHTML = `<h2>Countries with Population Less Than 2 Lakhs:</h2> <pre>${JSON.stringify(countriesWithPopulationLessThan2Lakhs, null, 2)}</pre>`;
    printCountryDetails(countriesData);
    document.getElementById("totalPopulation").innerHTML = `<h2>Total Population of Countries:</h2> <p>${totalPopulation}</p>`;
    document.getElementById("usDollarCountries").innerHTML = `<h2>Countries Using US Dollars as Currency:</h2> <pre>${JSON.stringify(usDollarCountries, null, 2)}</pre>`;
}

main();