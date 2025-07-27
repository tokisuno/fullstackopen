import { useState } from 'react';
import Results from './components/Results.jsx'

const App = () => {
  const [value, setValue] = useState('');
  const [country, setCountry] = useState({});
  const [countries, setCountries] = useState([]);
  const [result, setResult] = useState(null);

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
      <Results result={result} countries={countries} setCountries={setCountries} />
    </div>
  )
}

export default App
