import { useState } from 'react'

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({text, count}) => (
  <div>
    <p>{text} {count}</p>
  </div>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodButtonClicks = () => setGood(good + 1)
  const handleNeutralButtonClicks = () => setNeutral(neutral + 1)
  const handleBadButtonClicks = () => setBad(bad + 1)

  const average = (good - bad)/(good + neutral + bad)
  const positive = 100 * good/(good + neutral + bad)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGoodButtonClicks}/>
      <Button text="neutral" handleClick={handleNeutralButtonClicks}/>
      <Button text="bad" handleClick={handleBadButtonClicks}/>
      <h1>statistics</h1>
      <Statistic text="good" count={good}/>
      <Statistic text="neutral" count={neutral}/>
      <Statistic text="bad" count={bad}/>
      <Statistic text="all" count={good + neutral + bad}/>
      <Statistic text="average" count={average}/>
      <Statistic text="positive" count={positive + " %"}/>
    </div>
  )
}

export default App
