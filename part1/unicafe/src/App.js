import { useState } from 'react'

const Statistic = ({text, count}) => (
  <div>
    <p>{text} {count}</p>
  </div>
)

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

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
      <Button text="good" handleClick={handleGoodButtonClicks}/>
      <Button text="neutral" handleClick={handleNeutralButtonClicks}/>
      <Button text="bad" handleClick={handleBadButtonClicks}/>
      <h1>statistics</h1>
      <Statistic text="good" count={good}/>
      <Statistic text="neutral" count={neutral}/>
      <Statistic text="bad" count={bad}/>
    </div>
  )
}

export default App
