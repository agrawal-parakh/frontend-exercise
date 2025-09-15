import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import Tile from '../components/Tile'
import { TileType } from '../types'
import { shuffleArray } from '../utils/shuffle'

const imagePool = [
  '/public/plant01.jpg',
  'public/plant02.jpg',
  'public/plant03.jpg',
  'public/plant04.jpg',
  'public/plant05.jpg',
  'public/plant06.jpg',
  'public/plant07.jpg',
  'public/plant08.jpg',
  'public/plant09.jpg',
  'public/plant10.jpg',
  'public/plant11.jpg',
  'public/plant12.jpg',
  'public/plant13.jpg',
  'public/plant14.jpg',
  'public/plant15.jpg',
  'public/plant16.jpg',
  'public/plant17.jpg',
  'public/plant18.jpg'
]

const GamePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { playerName, boardSize } = location.state || {}
  const [tiles, setTiles] = useState<TileType[]>([])
  const [flippedTiles, setFlippedTiles] = useState<TileType[]>([])
  const [matchedCount, setMatchedCount] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isBoardLocked, setIsBoardLocked] = useState(false)

  const parseBoardSize = (size: string): number => {
    const [cols, rows] = size.split('x').map(Number)
    return cols * rows
  }

  // ✅ wrap setupBoard in useCallback so it’s stable
  const setupBoard = useCallback(() => {
    const tileCount = parseBoardSize(boardSize)
    const neededPairs = tileCount / 2
    const selectedImages = shuffleArray(imagePool).slice(0, neededPairs)
    const pairedImages = shuffleArray([...selectedImages, ...selectedImages])

    const tileData: TileType[] = pairedImages.map((img, index) => ({
      id: index,
      image: img,
      isFlipped: false,
      isMatched: false
    }))

    setTiles(tileData)
  }, [boardSize])

  useEffect(() => {
    if (!playerName || !boardSize) {
      navigate('/')
    } else {
      setupBoard()
    }
  }, [playerName, boardSize, navigate, setupBoard])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleTileClick = (index: number) => {
    if (isBoardLocked || tiles[index].isFlipped || tiles[index].isMatched) return

    const newTiles = [...tiles]
    newTiles[index].isFlipped = true
    setTiles(newTiles)
    const newFlipped = [...flippedTiles, newTiles[index]]

    setFlippedTiles(newFlipped)

    if (newFlipped.length === 2) {
      setIsBoardLocked(true)
      const [first, second] = newFlipped

      setTimeout(() => {
        const updatedTiles = [...newTiles]

        if (first.image === second.image) {
          updatedTiles[first.id].isMatched = true
          updatedTiles[second.id].isMatched = true
          setMatchedCount((prev) => prev + 1)
        } else {
          updatedTiles[first.id].isFlipped = false
          updatedTiles[second.id].isFlipped = false
        }

        setTiles(updatedTiles)
        setFlippedTiles([])
        setIsBoardLocked(false)
      }, 1000)
    }
  }

  useEffect(() => {
    const totalPairs = parseBoardSize(boardSize) / 2
    if (matchedCount === totalPairs) {
      setTimeout(() => {
        navigate('/end', { state: { playerName, timer } })
      }, 500)
    }
  }, [matchedCount, boardSize, navigate, playerName, timer])

  const boardCols = boardSize?.split('x')[0] || 0

  return (
    <div className='game-container'>
      <div className='game-header'>
        <h2 className='game-player'>Player: {playerName}</h2>
        <h2 className='game-timer'>Time: {timer}s</h2>
      </div>

      <div className='game-grid' style={{ gridTemplateColumns: `repeat(${boardCols}, minmax(0, 1fr))` }}>
        {tiles.map((tile, index) => (
          <Tile key={tile.id} tile={tile} onClick={() => handleTileClick(index)} />
        ))}
      </div>
    </div>
  )
}

export default GamePage
