import { useState } from 'react'

const Header = ({text}) => (
  <h1>{text}</h1>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({text}) => (
  <p>{text}</p>
)

const Votes = ({count}) => (
  <p>has {count} votes</p>
)

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const headers = [
    "Anecdote of the day",
    "Anecdote with most votes",
  ]

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)

  const initialState = Array(anecdotes.length).fill(0)

  const [points, setPoints] = useState(initialState)

  const handleClick = () => setSelected(getRandomInt(anecdotes.length))

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const indexOfMostVotes = points.indexOf(Math.max(...points));
  
  return (
    <div>
      <Header text={headers[0]} />
      <Anecdote text={anecdotes[selected]} />
      <Votes count={points[selected]} />
      <Button handleClick={voteAnecdote} text="vote" />
      <Button handleClick={handleClick} text="next anecdote" />
      <Header text={headers[1]} />
      <Anecdote text={anecdotes[indexOfMostVotes]} />
      <Votes count={points[indexOfMostVotes]} />
    </div>
  )
}

export default App;
