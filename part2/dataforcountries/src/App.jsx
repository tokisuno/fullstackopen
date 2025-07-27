import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  // search value
  const [value, setValue] = useState('');

  // country acquired on return
  const [country, setCountry] = useState({});

  // country list when fetching from /all
  const [countries, setCountries] = useState([]);

  // result that comes back
  const [result, setResult] = useState(null);

  useEffect(() => {
    console.log('effect run: result is now: ', result);
    if (country) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(res => {
          res.data.forEach(c => {
            const name = c.name.common.toLowerCase();
            if (result === '') {
              setCountries([]);
              return;
            }

            if (name.includes(result.toLowerCase())) {
              console.log(countries);
              setCountries(prev => [...prev, c.name.common]);
            }
          })
        })
        .catch(err => {
          setCountries([]);
        })
    }
  }, [result])
  console.log(countries);

  const handleChange = (event) => {
    if (event.target.value === '') {
      setResult(null);
    }
    setValue(event.target.value);
  }

  const onSearch = (event) => {
    event.preventDefault();
    setResult(value);
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        find country: <input value={value} onChange={handleChange} />
      </form>
      <pre>
        {JSON.stringify(countries, null, 2)}
      </pre>
    </div>
  )
}

export default App
