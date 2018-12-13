import React, { Component } from 'react'
import Card from './card'
import FacebookLogin from 'react-facebook-login'

const divStyles = {
  width: '800px',
  padding: '0px',
  margin: 'auto',
  display: 'block'
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
    let temporal =
      '{"user_id":"194905014179132","cards":null,"score":"10","full_name":"Test testiano testianguez","mistakes":"0","multiplier":"1","time":"0","tryNumber":"0"}'
    temporal = JSON.parse(temporal)

    /*var data = 'action=login&user_id=194905014179132&fullname=Test%20testiano%20testianguez&undefined='
    var xhr = new XMLHttpRequest()
    xhr.withCredentials = true
    xhr.addEventListener('readystatechange', function() {
      //const response = JSON.parse(temporal)
    })
    xhr.open('POST', 'https://centralmedia.com.mx/facebook/cliente-nutribaby/memorama/entrypoint.php')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('cache-control', 'no-cache')
    xhr.send(data)*/

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

    let totalScore = this.state.flipped
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
  }

  componentDidUpdate() {
    this.state.cards.every(card => card.solved) && console.log(this.state)
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
        <FacebookLogin
          appId="285081055684698"
          autoLoad={true}
          fields="name,email,picture"
          callback={this.responseFacebook.bind(this)}
          cssClass="my-facebook-button-class"
          icon="fa-facebook"
        />
        <p>{this.state.name}</p>
        <p>{this.state.id}</p>
        {false && <button onClick={this.logState.bind(this)}>Log</button>}
        <div>
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
              </tr>
            </tbody>
          </table>
          {this.state.ready &&
            this.state.mistakes > 1 && <button onClick={this.resetGame.bind(this)}>Reset Game</button>}

          {!this.state.ready && (
            <button onClick={this.startGame.bind(this)}>
              {(this.state.score > 0 && 'Retry game') || 'Start Game'}
            </button>
          )}
        </div>
        {this.state.id &&
          this.state.ready &&
          this.state.cards.map(card => (
            <Card active={this.state.ready} handleClick={this.handleCardClick.bind(this)} card={card} />
          ))}
      </div>
    )
  }
}

export default App
