import React, { Component } from 'react'
import { connect } from 'react-redux'

class About extends Component {
  render() {
    return (
      <div>
        <p>
          Made by: <b>Enrique Serrano</b>
        </p>
        <br />
        {this.props.userInfo.score && <b>you score: {this.props.userInfo.score} </b>}
      </div>
    )
  }
}

const mapStateToProps = ({ userInfo }) => {
  return { userInfo }
}

export default connect(mapStateToProps)(About)
