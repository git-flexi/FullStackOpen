import { useState, useEffect } from 'react';

import countryService from './services/countryService';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    countryService.getAll()
      .then(initialCountries => {
        setCountries(initialCountries);
      });
  }, []);

  const applyFilter = (filterTerm, exactSearch) => {
    if (exactSearch) {
      setFilteredCountries(countries.filter(country => country.name.common.toUpperCase() === filterTerm.toUpperCase()));
    } else {
      setFilteredCountries(countries.filter(country => country.name.common.toUpperCase().includes(filterTerm.toUpperCase())));
    }
    setFilter(filterTerm);
  };

  const filterChange = (event) => {
    applyFilter(event.target.value, false);
  };

  return (
    <div>
      <Filter filterValue={filter} filterChange={filterChange} />
      <Countries filteredCountries={filteredCountries} showCountry={applyFilter} />
    </div>
  );
};

export default App;