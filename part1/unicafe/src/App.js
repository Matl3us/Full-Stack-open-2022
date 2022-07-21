import { useState } from 'react'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {

  if (good + neutral + bad > 0) {
    const average = (good - bad) / (good + neutral + bad)
    const positive = 100 * good / (good + neutral + bad)

    return (
      <div>
        <h1>statistics</h1>
        <table>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive + "%"} />
        </table>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodButtonClicks = () => setGood(good + 1)
  const handleNeutralButtonClicks = () => setNeutral(neutral + 1)
  const handleBadButtonClicks = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGoodButtonClicks} />
      <Button text="neutral" handleClick={handleNeutralButtonClicks} />
      <Button text="bad" handleClick={handleBadButtonClicks} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
