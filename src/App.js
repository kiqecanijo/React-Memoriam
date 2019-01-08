import React, { Component } from 'react'
//import Card from './card'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import { connect } from 'react-redux'
//import FacebookLogin from 'react-facebook-login'
//import ReactCardFlip from 'react-card-flip'
import { reorderCards, updateCards } from './actions/cards-actions'
import { renameUser } from './actions/user-actions'
import Test from './test.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Topic = ({ match }) => <h3>Requested Param: {match.params.id}</h3>
const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>

    <ul>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route exact path={match.path} render={() => <h3>Please select a topic.</h3>} />
    <Route path={`${match.path}/:id`} component={Topic} />
  </div>
)

const Header = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/topics">Topics</Link>
    </li>
  </ul>
)

const AppRouter = () => (
  <Router>
    <div>
      <Header />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>
)

class App extends Component {
  constructor(props) {
    super(props)
    this.onReorderCards = this.onReorderCards.bind(this)
    this.onUpdateCards = this.onUpdateCards.bind(this)
    this.onRenameUser = this.onRenameUser.bind(this)

    this.state = { items: [] }
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd() {
    const newItems = this.state.items.concat('randomString')
    this.setState({ items: newItems })
  }

  handleRemove(i) {
    let newItems = this.state.items.slice()
    newItems.splice(i, 1)
    this.setState({ items: newItems })
  }

  componentDidMount(callback) {
    setTimeout(() => {
      this.setState({
        ...this.state,
        items: ['hello', 'world', 'click', 'me', 'meno']
      })
    }, 500)
    setTimeout(() => {
      console.log('GG')
    }, 500)
  }

  /*responseFacebook(response) {
    this.setState({
      ...this.state,
      name: response.name,
      id: response.id,
      picture: response.picture
    })
  }*/
  onUpdateCards() {
    let cards = this.props.cards /*.filter(el => el.value > 0)*/
      .sort((a, b) => {
        return 0.5 - Math.random()
      })

    this.props.onUpdateCards(cards)
  }

  onReorderCards() {
    let cards = this.props.cards.filter(el => el.value > 0)
    //let cards = this.props.cards
    this.props.onReorderCards(cards)
  }
  onRenameUser(event) {
    this.props.onRenameUser(event.target.value)
  }

  /*handleCardClick(handleCard) {
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
*/

  render() {
    const items = this.state.items.map((item, i) => (
      <div key={item} onClick={() => this.handleRemove(i)}>
        {item}
      </div>
    ))

    return (
      <div>
        <div>
          <button onClick={this.handleAdd}>Add Item</button>
          <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            {items}
          </ReactCSSTransitionGroup>
        </div>
        <ul>
          {this.props.cards.map(el => (
            <li>{el.image}</li>
          ))}
        </ul>
        <p>{this.props.userInfo.name}</p>
        <button onClick={this.onReorderCards}>Reorder</button>

        <input onChange={this.onRenameUser} placeholder={this.props.userInfo.name} />
        <Test />
      </div>
    )
  }

  /*render() {
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
              this.props.cards.map(card => (
                <Card active={this.state.ready} handleClick={this.handleCardClick.bind(this)} card={card} />
              ))}
          </div>
        </ReactCardFlip>
        {false && <button onClick={this.logState.bind(this)}>Log</button>}
      </div>
    )
  }
  */
}

const mapDispatchToProps = {
  onReorderCards: reorderCards,
  onRenameUser: renameUser,
  onUpdateCards: updateCards
}
const mapStateToProps = ({ userInfo, score, cards }) => {
  return { userInfo, score, cards }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
/*export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter)*/
