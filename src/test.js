import React from 'react'
import { connect } from 'react-redux'

const Test = props => {
  return (
    <div>
      <h1>test Component</h1>
      <p>{props.userInfo.name}</p>
    </div>
  )
}
const mapStateToProps = ({ userInfo, score, cards }) => {
  return { userInfo, score, cards }
}
export default connect(mapStateToProps)(Test)
