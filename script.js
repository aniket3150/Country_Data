document.addEventListener('DOMContentLoaded', () => {
    const countriesContainer = document.querySelector('.countries-container');
    const filterByRegion = document.querySelector('.filter-by-region');
    const searchInput = document.querySelector('.search-container input');
    const themeChanger = document.querySelector('.theme-changer');
  
    let allCountriesData = [];
  
    //  Fetch all countries on page load
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        allCountriesData = data;
        renderCountries(allCountriesData); // Show all countries initially
      })
      .catch((err) => console.error("Error fetching countries:", err));
  
    //  Render country cards
    function renderCountries(data) {
      countriesContainer.innerHTML = ''; // Clear previous cards
      data.forEach((country) => {
        const countryCard = document.createElement('a');
        countryCard.classList.add('country-card');
        countryCard.href = `/country.html?name=${country.name.common}`;
        countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0] || 'N/A'}</p>
          </div>
        `;
        countriesContainer.appendChild(countryCard);
      });
    }
  
    //  Region Filter
    filterByRegion.addEventListener('change', () => {
      const selectedRegion = filterByRegion.value;
      if (!selectedRegion) return;
  
      fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
        .then((res) => res.json())
        .then((data) => {
          renderCountries(data);
          allCountriesData = data; // Update for search
        })
        .catch((err) => console.error("Error filtering region:", err));
    });
  
    //  Search Filter
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      if (!allCountriesData.length) return;
  
      const filtered = allCountriesData.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      );
      renderCountries(filtered);
    });
  
    //  Dark Mode Toggle
    themeChanger.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
  });
  