import React, { Component } from 'react'

const divStyle = {
  width: '25%',
  textAlign: 'center',
  display: 'inline-block',
  height: '220px',
  paddin: '1px'
}

const imgStyle = {
  width: '99%',
  heigth: '99%'
}

class Card extends Component {
  render() {
    return (
      <div style={divStyle}>
        <img alt="card" style={imgStyle} src={'./static/gray.jpg'} />
      </div>
    )
  }
}
export default Card
