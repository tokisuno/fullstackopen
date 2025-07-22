import { useState } from 'react'

// const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Anecdote = ({ quote, votes }) => {
  return (
    <div>
      <p>{quote}</p>
      <p>This quote has {votes} vote(s)!</p>
    </div>
  )
}

const MostPopular = (props) => {
  let top = {
    quote: "",
    votes: 0
  };

  props.list.forEach(item => {
    if (item.votes > top.votes) {
      top = item;
    }
  })

  if (top.quote === "") {
    return (
      <div>
        <p>No votes have been registered yet :')</p>
      </div>
    )
  }

  return (
    <div>
      {top.quote}
      <p>This quote has the most amount of votes! ({top.votes})</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    {
      quote: 'If it hurts, do it more often.',
      votes: 0
    },
    {
      quote: 'Adding manpower to a loate software project makes it later!',
      votes: 0
    },
    {
      quote: 'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accuontsfor the other 90 percent of the development time.',
      votes: 0
    },
    {
      quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    {
      quote: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    },
    {
      quote: 'Programming without an extremely heavy use of console.log is the same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      votes: 0
    },
    {
      quote: 'The only way to go fast, is to go well.',
      votes: 0
    },
  ]

  const [index, setIndex] = useState(0);
  const [list, setList] = useState(anecdotes);

  const handleIndex = () => {
    const updatedIndex = Math.floor(Math.random() * (list.length))
    setIndex(updatedIndex);
  }


  const handleVote = () => {
    const copy = [...list];
    copy[index].votes += 1;
    setList(copy);
  }

  return (
    <div>
      <h1>Anecdote of the day :p</h1>
      <Anecdote quote={list[index].quote} votes={list[index].votes} />
      <Button onClick={handleIndex} text="Next anecdote" />
      <Button onClick={handleVote} text="Vote" />
      <h1>Anecdote with the most votes</h1>
      <MostPopular list={list} />
    </div>
  )
}

export default App
