import { useState } from 'react'

const Header = ({name}) => (
  <h1>{name}</h1>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({stats}) => {
  const values = Object.keys(stats).map(function(key) { return stats[key]; });
  stats.all = values.reduce((a, b) => a + b, 0)
  stats.avg = (stats.good - stats.bad) / stats.all
  stats.positive = (stats.good / stats.all) * 100

  if (stats.all === 0) {
    return <div>No feedback given</div>
  }
  
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={stats.good} />
        <StatisticLine text="neutral" value={stats.neutral} />
        <StatisticLine text="bad" value={stats.bad} />
        <StatisticLine text="all" value={stats.all} />
        <StatisticLine text="average" value={stats.avg} />
        <StatisticLine text="positive" value={stats.positive + " %"} />
      </tbody>
    </table>
  )
}

const App = () => {
  const headers = {
    "feedback": "give feedback",
    "statistics": "statistics"
  }

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const stats = {
    "good": good,
    "neutral": neutral,
    "bad": bad,
  }

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Header name={headers.feedback} />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Header name={headers.statistics} />
      <Statistics stats={stats} />
    </div>
  )
}

export default App;
