import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = (props) => {
  if (props.text == "Average" || props.text == "Positive") {
    return (
      <p>{props.text}: {props.value}%</p>
    )
  }
  return <p>{props.text}: {props.value}</p>
}

const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral;
  const average = Math.floor(((props.good - props.bad) / total) * 100);
  const positive = Math.floor((props.good / total) * 100);
  if (total === 0) {
    return (
      <div>
        no reviews found :/
      </div>
    )
  }

  return (
    <div>
      <StatisticLine text="Good" value={props.good} />
      <StatisticLine text="Neutral" value={props.neutral} />
      <StatisticLine text="Bad" value={props.bad} />
      <StatisticLine text="Total" value={total} />
      <StatisticLine text="Average" value={average} />
      <StatisticLine text="Positive" value={positive} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setTotal(total + 1);
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotal(total + 1);
  }

  const handleBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setTotal(total + 1);
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button onClick={handleGood} text="Good" />
        <Button onClick={handleNeutral} text="Neutral" />
        <Button onClick={handleBad} text="Bad" />
      </div>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
