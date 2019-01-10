import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group' // ES6

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
  constructor(props) {
    super(props)
    this.state = {
      element: 'X'
    }
  }

  componentWillMount() {
    setInterval(() => {
      this.setState({
        element: this.state.element == 'X' ? 'Y' : 'X'
      })
    }, 1000)
  }

  render() {
    /*const img = this.props.el.flipped ? (
      <img alt="card" style={imgStyle} src={this.props.el.path} onClick={this.props.handleClick} />
    ) : (
      <img alt="card" style={imgStyle} src={'./static/gray.jpg'} onClick={this.props.handleClick} />
    )*/

    const img = this.state.element == 'X' ? <p>{this.state.element}</p> : <p>{this.state.element}</p>

    return (
      <CSSTransitionGroup
        style={divStyle}
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {img}
      </CSSTransitionGroup>
    )
  }
}

const mapStateToProps = ({ userInfo, cards }) => {
  return { userInfo, cards }
}

export default connect(mapStateToProps)(Card)
