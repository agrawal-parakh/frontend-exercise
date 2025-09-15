import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const EndPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { playerName, timer } = location.state || {}

  useEffect(() => {
    if (!playerName || timer === undefined) {
      navigate('/')
    }
  }, [playerName, timer, navigate])

  const handlePlayAgain = () => {
    navigate('/')
  }

  return (
    <div className='end-container'>
      <h1 className='end-title'>🎉 Game Complete!</h1>
      <p className='end-message'>
        Great job, <span className='highlight'>{playerName}</span>!
      </p>
      <p className='end-timer'>
        You completed the game in <span className='bold'>{timer}</span> seconds.
      </p>
      <button onClick={handlePlayAgain} className='play-again-button'>
        Play Again
      </button>
    </div>
  )
}

export default EndPage
