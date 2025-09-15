import React from 'react'
import { TileType } from '../types'

interface Props {
  tile: TileType
  onClick: () => void
}

const Tile: React.FC<Props> = ({ tile, onClick }) => {
  return (
    <div onClick={onClick} className='tile-container'>
      <div className={`tile-inner ${tile.isFlipped || tile.isMatched ? 'flipped' : ''}`}>
        <div className='tile-back'>
          <img src='/growy_logo.svg' alt='back' className='tile-image' />
        </div>

        <div className='tile-front'>
          <img src={tile.image} alt='front' className='tile-image' />
        </div>
      </div>
    </div>
  )
}

export default Tile
