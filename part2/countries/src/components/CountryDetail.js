import Weather from "./Weather";

const CountryDetail = ({ country }) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>
                <p>Capital {country.capital}</p>
                <p>Area {country.area}</p>
            </div>
            <div>
                <h3>Spoken languages</h3>
                <ul>
                    {
                        Object.values(country.languages).map(language => {
                            return (
                                <li key={language}>{language}</li>
                            );
                        })

                    }
                </ul>
            </div>
            <div>
                <img src={country.flags.png} alt={country.name.alt} />
            </div>
            <Weather country={country} />
        </div>
    );

};

export default CountryDetail;