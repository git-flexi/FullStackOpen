import CountryDetail from "./CountryDetail";

const Countries = ({ filteredCountries, showCountry }) => {
    if (filteredCountries === null) {
        // First Render
        return (
            <div>Please enter a filter to start...</div>
        );
    }

    if (filteredCountries.length === 0) {
        return (
            <div>No matches found for the given filter...</div>
        );
    }

    if (filteredCountries.length > 10) {
        return (
            <div>Too many matches, please filter more specific...</div>
        );
    }

    if (filteredCountries.length > 1) {
        return (
            <div>
                {
                    filteredCountries.map((country) => {
                        return (
                            <div key={country.name.common}>
                                {country.name.common}
                                <button onClick={() => showCountry(country.name.common, true)}>Show</button>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    return (
        <div>
            <CountryDetail country={filteredCountries[0]} />
        </div>
    );

};

export default Countries;