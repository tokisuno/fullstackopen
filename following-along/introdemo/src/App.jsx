const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>Hello {props.name}! You are {props.age} years old.</p>
    </div>
  )
}

const App = () => {
  const name = 'peter';
  const age = 21;

  return (
    <div>
      <Hello name="Lucas" age={age + 2} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App
