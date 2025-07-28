import axios from 'axios';
import { useEffect } from 'react';
const Results = ({ result, countries, setCountries }) => {
  useEffect(() => {
    if (countries) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(res => {
          res.data.forEach(c => {
            const name = c.name.common.toLowerCase();
            if (name.includes(result.toLowerCase())) {
              if (countries.includes(result.toLowerCase())) {
                console.log('already exists');
                return;
              } else {
                setCountries(prev => [...prev, c.name.common]);
              }
            }
          })
        })
        .catch(err => {
          setCountries([]);
        })
    }
  }, [result])

  console.log(countries);

  if (result === '') {
    return (
      <p>Please make a search :)</p>
    );
  }

  if (countries.length > 9) {
    return (
      <p>Oops! Your search is too broad. Try to narrow it down.</p>
    )
  } else {
    return (
      <ul>
        {countries.map(country => {
          return (
            <li key={country}>{country}</li>
          )
        })}
      </ul>
    )
  }
}

export default Results
