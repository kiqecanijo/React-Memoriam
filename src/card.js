import React, { Component } from 'react'
import { connect } from 'react-redux'

const divStyle = {
  width: '25%',
  textAlign: 'center',
  display: 'inline-flex'
}

const imgStyle = {
  width: '98%',
  height: '98%'
}

class Card extends Component {
  render() {
    return (
      <div style={divStyle}>
        <img
          alt="card"
          style={imgStyle}
          src={this.props.el.flipped ? this.props.el.path : './static/gray.jpg'}
          onClick={this.props.handleClick}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ userInfo, cards }) => {
  return { userInfo, cards }
}

export default connect(mapStateToProps)(Card)
