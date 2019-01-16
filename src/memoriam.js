import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { renameUser } from './actions/user-actions'
import { Link } from 'react-router-dom'
import { reorderCards, updateCards, flipCards, hideCards, showCards } from './actions/cards-actions'
import Card from './card.js'

const memoriamStyles = {
  margin: 'auto',
  width: '80%',
  maxWidth: '1024px',
  minWidth: '250px'
}

const reorderStyles = {
  color: 'white',
  backgroundColor: 'gray',
  border: '0px',
  borderRadius: '4px',
  fontSize: '15px',
  margin: '2px'
}
const flipStyles = {
  color: 'white',
  backgroundColor: 'orange',
  border: '0px',
  borderRadius: '4px',
  fontSize: '15px',
  margin: '2px'
}
const hideStyles = {
  color: 'white',
  backgroundColor: 'red',
  border: '0px',
  borderRadius: '4px',
  fontSize: '15px',
  margin: '2px'
}
const showStyles = {
  color: 'white',
  backgroundColor: 'green',
  border: '0px',
  borderRadius: '4px',
  fontSize: '15px',
  margin: '2px'
}

class Memoriam extends Component {
  handleReoder = (event = null) => {
    this.props.onReorderCards(this.props.cards.filter(el => el))
  }
  //TODO why doesnt work using the same dispatch ?, only in willMount
  handleFlip = (event = null) => {
    this.props.onFlipCards(this.props.cards.filter(el => el))
  }
  handleHide = (event = null) => {
    this.props.onHideCards(this.props.cards.filter(el => el))
  }
  handleShow = (event = null) => {
    this.props.onShowCards(this.props.cards.filter(el => el))
  }
  handleCardClick = index => {
    this.props.onUpdateCards(this.props.cards.filter(el => el), index)
  }

  componentWillMount = () => {
    this.handleReoder()
  }

  render() {
    return (
      <div>
        <b>Solved:</b> {this.props.cards.filter(el => el.solved).length}
        <br />
        <b>Flipped:</b> {this.props.cards.filter(el => el.flipped).length}
        <br />
        <br />
        <div style={memoriamStyles}>
          {this.props.cards.map((el, index) => (
            <Card el={el} handleClick={el => this.handleCardClick(index)} key={index} id={index} />
          ))}
        </div>
        <br />
        {this.props.userInfo.debug && (
          <div>
            <button style={showStyles} onClick={this.handleShow.bind(this)}>
              Show all
            </button>
            <button style={flipStyles} onClick={this.handleFlip.bind(this)}>
              Switch flip
            </button>
            <button style={hideStyles} onClick={this.handleHide.bind(this)}>
              Hide all
            </button>
            <button style={reorderStyles} onClick={this.handleReoder.bind(this)}>
              Reorder
            </button>
          </div>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = {
  onReorderCards: reorderCards,
  onRenameUser: renameUser,
  onUpdateCards: updateCards,
  onFlipCards: flipCards,
  onHideCards: hideCards,
  onShowCards: showCards
}

const mapStateToProps = ({ userInfo, cards }) => {
  return { userInfo, cards }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Memoriam)
