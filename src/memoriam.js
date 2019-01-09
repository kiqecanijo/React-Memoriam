import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renameUser } from './actions/user-actions'
import { reorderCards, updateCards } from './actions/cards-actions'
import Card from './card.js'

const memoriamStyles = {
  margin: 'auto',
  width: '80%'
}

class Memoriam extends Component {
  onRenameUser(event) {
    this.props.onRenameUser(event.target.value)
  }

  render() {
    return (
      <div style={memoriamStyles}>
        {this.props.cards.map(el => (
          <Card id={el.id} />
        ))}
      </div>
    )
  }
}

const mapDispatchToProps = {
  onReorderCards: reorderCards,
  onRenameUser: renameUser,
  onUpdateCards: updateCards
}

const mapStateToProps = ({ userInfo, cards }) => {
  return { userInfo, cards }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Memoriam)
