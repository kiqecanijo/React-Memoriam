import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CSSTransition, CSSTransitionGroup } from 'react-transition-group' // ES6

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
    const img = this.props.el.flipped ? (
      <img alt="card" style={imgStyle} src={this.props.el.path} onClick={this.props.handleClick} />
    ) : (
      <img alt="card" style={imgStyle} src={'./static/gray.jpg'} onClick={this.props.handleClick} />
    )

    return (
      <CSSTransitionGroup
        style={divStyle}
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={true}
        transitionLeave={true}
        classNames="fade">
        {img}
      </CSSTransitionGroup>
    )
  }
}

const mapStateToProps = ({ userInfo, cards }) => {
  return { userInfo, cards }
}

export default connect(mapStateToProps)(Card)
