import React from 'react'
import ReactCardFlip from 'react-card-flip'

const divStyle = {
  width: '200px',
  textAlign: 'center',
  display: 'inline-block',
  height: '196px',
  paddin: '2px'
}

const imgStyle = {
  width: '99%',
  heigth: '99%'
}

const Card = props => {
  return (
    <div
      onClick={el => props.active && !props.card.revealed && !props.card.solved && props.handleClick(props.card)}
      style={divStyle}>
      <ReactCardFlip
        onClick={el => props.active && !props.card.revealed && !props.card.solved && props.handleClick(props.card)}
        style={divStyle}
        isFlipped={props.card.solved || props.card.revealed}>
        <div key="back" className="develop">
          <img
            alt="grayImage"
            style={imgStyle}
            src={props.card.revealed || props.card.solved ? props.card.image : '/static/gray.jpg'}
          />
        </div>

        <div key="front" className="develop">
          <img alt="card" style={imgStyle} src={'./static/gray.jpg'} />
        </div>
      </ReactCardFlip>
    </div>
  )
}
export default Card
