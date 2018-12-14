import React, { Component } from 'react'
import Card from './card'
import FacebookLogin from 'react-facebook-login'
import ReactCardFlip from 'react-card-flip'

const divStyles = {
  width: '800px',
  padding: '0px',
  margin: 'auto',
  display: 'block'
}

const retryButton = {
  width: '200px',
  color: 'white',
  backgroundColor: 'orange',
  borderRadius: '10px',
  fontSize: '20px',
  padding: '15px'
}
const resetButton = {
  padding: '15px',
  color: 'white',
  backgroundColor: 'red',
  borderRadius: '10px',
  border: '0px',
  fontSize: '20px'
}

class App extends Component {
  responseFacebook(response) {
    this.setState({
      ...this.state,
      name: response.name,
      id: response.id,
      picture: response.picture
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      ...props,
      totalScore: 0,
      score: 0,
      solved: 0,
      multiplier: 1,
      mistakes: 0,
      flipped: false,
      won: false,
      ready: false,
      cards: [
        { value: 1, revealed: false, solved: false, image: './static/puppy1.jpg' },
        { value: 1, revealed: false, solved: false, image: './static/puppy1.jpg' },
        { value: 2, revealed: false, solved: false, image: './static/puppy2.jpg' },
        { value: 2, revealed: false, solved: false, image: './static/puppy2.jpg' },
        { value: 3, revealed: false, solved: false, image: './static/puppy3.jpg' },
        { value: 3, revealed: false, solved: false, image: './static/puppy3.jpg' },
        { value: 4, revealed: false, solved: false, image: './static/puppy4.jpg' },
        { value: 4, revealed: false, solved: false, image: './static/puppy4.jpg' },
        { value: 5, revealed: false, solved: false, image: './static/puppy5.jpg' },
        { value: 5, revealed: false, solved: false, image: './static/puppy5.jpg' },
        { value: 6, revealed: false, solved: false, image: './static/puppy6.jpg' },
        { value: 6, revealed: false, solved: false, image: './static/puppy6.jpg' },
        { value: 7, revealed: false, solved: false, image: './static/puppy7.jpg' },
        { value: 7, revealed: false, solved: false, image: './static/puppy7.jpg' },
        { value: 8, revealed: false, solved: false, image: './static/puppy8.jpg' },
        { value: 8, revealed: false, solved: false, image: './static/puppy8.jpg' }
      ]
    }
  }

  componentWillMount() {
    //TODO create connection for initial info

    let temporal =
      '{"user_id":"194905014179132","cards":null,"score":"10","full_name":"Test testiano testianguez","mistakes":"0","multiplier":"1","time":"0","tryNumber":"0"}'
    temporal = JSON.parse(temporal)

    this.setState({
      ...this.state,
      score: temporal.score,
      cards: this.state.cards.sort(function(a, b) {
        return 0.5 - Math.random()
      })
    })
  }

  logState() {
    console.log(this.state)
  }

  handleCardClick(handleCard) {
    let currentCards = this.state.cards
    //####### hide all except current flipped ######
    //#(inverted in component at compare moment) ###
    currentCards = !this.state.flipped
      ? currentCards.map(card => ({ ...card, revealed: card === handleCard ? !card.revealed : false }))
      : currentCards
    ////######### flip current selected #########
    currentCards = currentCards.map(card => (card === handleCard ? { ...card, revealed: true } : card))
    //########### at round #sameCards ##############
    const sameCardsInRound = currentCards.filter(card => card.revealed && card.value === handleCard.value).length
    //#### have 2 same cards ? update as solved ####
    currentCards =
      sameCardsInRound === 2
        ? currentCards.map(card => (card.revealed ? { ...card, solved: true } : card))
        : currentCards

    const solved = (sameCardsInRound === 2 && this.state.solved + 1) || this.state.solved

    const multiplier =
      (sameCardsInRound === 2 && this.state.multiplier + 1) || (!this.state.flipped && this.state.multiplier) || 1

    const mistakes = (this.state.flipped && sameCardsInRound !== 2 && this.state.mistakes + 1) || this.state.mistakes
    const totalScore = this.state.flipped
      ? this.state.totalScore + (sameCardsInRound === 2 ? 100 : 0) * this.state.multiplier
      : this.state.totalScore
    let score = totalScore / (mistakes || 1)
    score = score.toFixed(2)

    //############# set state #######################
    this.setState({
      ...this.state,
      flipped: !this.state.flipped,
      cards: currentCards,
      totalScore,
      score,
      solved,
      mistakes,
      multiplier
    })
    //are player won ?
    currentCards.every(card => card.solved) &&
      setTimeout(el => {
        this.setState({
          ...this.state,
          won: true,
          ready: false
        })
      }, 3000)
    //notify
    //you win
  }

  startGame() {
    this.setState({
      ...this.state,
      score: 0.0,
      ready: true
    })
  }
  resetGame() {
    let cards = this.state.cards.map(card => ({ ...card, revealed: false, solved: false }))
    this.setState({
      ...this.state,
      ready: true,
      won: false,
      score: 0,
      totalScore: 0,
      solved: 0,
      multiplier: 1,
      mistakes: 0,
      cards: cards.sort((a, b) => {
        return 0.5 - Math.random()
      })
    })
  }

  render() {
    return (
      <div style={divStyles}>
        <ReactCardFlip isFlipped={!this.state.ready}>
          <div key="back" style={{ textAlign: 'center' }}>
            {!this.state.id && (
              <FacebookLogin
                appId="1999682333432755"
                autoLoad={true}
                fields="name,email,picture"
                callback={this.responseFacebook.bind(this)}
                cssClass="my-facebook-button-class"
                icon="fa-facebook"
              />
            )}
            <p>{!this.state.won && this.state.name && `Hola: ${this.state.name} `}</p>
            <p>{!this.state.won && this.state.id}</p>
            <div>
              {this.state.id && (!this.state.ready ? `Max score: ${this.state.score}` : `score: ${this.state.score} `)}
              <br />
              <br />
              {this.state.id &&
                !this.state.ready && (
                  <button
                    style={retryButton}
                    onClick={!this.state.won ? this.startGame.bind(this) : this.resetGame.bind(this)}>
                    {(this.state.score > 0 && 'Retry game') || 'Start Game'}
                  </button>
                )}
            </div>
          </div>
          <div key="front">
            <table>
              <tbody>
                <tr>
                  <td>
                    {!this.state.ready ? 'Max score' : 'score'}: {this.state.score}
                  </td>
                  <br />
                  {this.state.mistakes > 1 && <td>mistakes: {this.state.mistakes}</td>}
                  <br />
                  {this.state.multiplier > 1 && <td>multiplier: {this.state.multiplier}</td>}
                  <br />

                  {this.state.ready &&
                    this.state.mistakes > 1 && (
                      <button style={resetButton} onClick={this.resetGame.bind(this)}>
                        Reset Game
                      </button>
                    )}
                </tr>
              </tbody>
            </table>
            {this.state.id &&
              this.state.ready &&
              this.state.cards.map(card => (
                <Card active={this.state.ready} handleClick={this.handleCardClick.bind(this)} card={card} />
              ))}
          </div>
        </ReactCardFlip>
        {false && <button onClick={this.logState.bind(this)}>Log</button>}
      </div>
    )
  }
}
export default App
