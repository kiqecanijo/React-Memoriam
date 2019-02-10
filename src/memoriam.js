import React, { Component } from 'react'
import { connect } from 'react-redux'
import { renameUser } from './actions/user-actions'
import { reorderCards, updateCards, flipCards, hideCards, showCards, setCards } from './actions/cards-actions'
import { addChat } from './actions/user-actions'
import { Spring } from 'react-spring'

import Card from './card.js'
import openSocket from 'socket.io-client'
let socket = openSocket('http://localhost:3001')

const memoriamStyles = {
  margin: 'auto',
  width: '80%'
}

const buttonStyles = {
  color: 'white',
  border: '0px',
  borderRadius: '4px',
  fontSize: '15px',
  margin: '2px'
}

class Memoriam extends Component {
  constructor(props) {
    super(props)
    this.state = { currentChat: '', randomChat: false , loadedFlag : false }
  }

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
    this.props.cards.filter(el => el.solved).length >= 14 && alert('you win')
  }

  handleNewChat = (event = null) => {
    socket.emit('chat message', { message: this.state.currentChat, name: this.props.userInfo.name })
  }

  componentWillMount = () => {
    this.handleReoder()

    //setListeners
    socket.on('chat message', message => {
      this.setState({ ...this.state, randomChat: true })
      this.props.onAddChat(message, this.props.userInfo)
    })
    socket.on('update cards', cards => {
      this.props.onSetCards(cards)
    })
  }
  componentDidMount = () => {
    setTimeout(el => {
      this.setState({
        ...this.state,
        loadedFlag : true
      })
    },6000)


  }

  render() {
    return (
      <div>
      <div className={'userData'}>
      <b>{this.props.userInfo.name}</b>
      <br />
      <b>Solved:</b> {this.props.cards.filter(el => el.solved).length}
      <br />
      <b>Flipped:</b> {this.props.cards.filter(el => el.flipped).length}
      <br />
      </div>
      <div style={memoriamStyles}>
      {this.props.cards.map((el, index) => (
        <Card el={el} handleClick={el => this.handleCardClick(index)} key={index} id={index} />
      ))}
      </div>
      <br />
      {this.props.userInfo.debug && (
        <div className={'userData'}>
        <button style={{ ...buttonStyles, backgroundColor: 'green' }} onClick={this.handleShow.bind(this)}>
        Show all
        </button>
        <button style={{ ...buttonStyles, backgroundColor: 'orange' }} onClick={this.handleFlip.bind(this)}>
        Switch flip
        </button>
        <button style={{ ...buttonStyles, backgroundColor: 'red' }} onClick={this.handleHide.bind(this)}>
        Hide all
        </button>
        <button style={{ ...buttonStyles, backgroundColor: 'gray' }} onClick={this.handleReoder.bind(this)}>
        Reorder
        </button>
        </div>
      )}

       {this.state.loadedFlag && <div className="chatSection"> <button
       style={{
         position: 'fixed',
         bottom: '0px',
         margin: '0px',
         right: '0px',
         lineHeigth: '0px',
         backgroundColor: 'red',
         color: 'white',
         height: '0px',
         textAlign: 'center',
         padding: '20px',
         borderRadius: '5px 5px 0px 0px',
         cursor: 'overlay',
         lineHeight: '0px',
         fontSize: '20px',
         minWidth: '300px',
         zIndex: 2
       }}
       onClick={el => this.setState({ ...this.state, randomChat: !this.state.randomChat })}>
       <b>Chat</b>
       </button>



       <Spring
       from={{ height: this.state.randomChat ? 0 : 400, opacity: this.state.randomChat ? 0 : 1 }}
       to={{ height: this.state.randomChat ? 400 : 0, opacity: this.state.randomChat ? 1 : 0 }}
       config={{ delay: 50,precision	: 0.05 }}>
       {props => (
         <div
         id=""
         style={{
           opacity: props.opacity || 0,
           height: props.height,
           position: 'fixed',
           bottom: '42px',
           right: '0px',
           width: '260px',
           borderRadius: '10px',
           backgroundColor: 'white',
           padding: '20px',
           boxShadow: '-2px -2px 2px grey'
         }}>
         <p>
         <b>Alias :</b>
         </p>
         <input
         style={{
           height: '35px',
           fontSize: '16px',
           color: 'red',
           border: '1px solid red',
           padding: '0px 13px',
           width: '110px'
         }}
         value={this.props.userInfo.name}
         id="name"
         autocomplete="off"
         maxLength={11}
         onChange={el => this.props.onRenameUser(el.target.value, this.props.userInfo)}
         />
         <div style={{ overflowY: 'scroll', height: '270px' }}>
         {this.props.userInfo.chat.slice(Math.max(this.props.userInfo.chat.length - 6, 0)).map(chat => (
           <p style={{ color: 'orange' }}>
           <b>{chat}</b>
           </p>
         ))}
         </div>
         <div>
         <input
         style={{
           height: '35px',
           fontSize: '16px',
           color: 'red',
           border: '1px solid red',
           padding: '0px 13px',
           width: '110px'
         }}
         value={this.state.currentChat}
         maxLength={25}
         autocomplete="off"
         onChange={el => this.setState({ ...this.state, currentChat: el.target.value })}
         />

         <button
         disabled={this.state.currentChat.length ? false : true}
         style={{ ...buttonStyles, backgroundColor: 'orange', padding: '11px' }}
         onClick={this.handleNewChat}>
         <b>Send chat</b>
         </button>
         </div>
         </div>
       )}
       </Spring> </div>  }

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
  onShowCards: showCards,
  onAddChat: addChat,
  onSetCards: setCards
}

const mapStateToProps = ({ userInfo, cards }) => {
  return { userInfo, cards }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Memoriam)
