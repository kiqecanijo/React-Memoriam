import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Spring } from 'react-spring'
import { useSpring, animated } from 'react-spring/hooks'
const divStyle = {
  width: '25%',
  //textAlign: 'center',
  display: 'inline-flex'
}
const imgStyle = {
  width: '98%'
}

const Card = ({ handleClick, id, el, userInfo }) => {
  return (
    <div style={divStyle}>
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ easing: t => t, duration: 1000, delay: 50 * id }}>
        {props => (
          <div style={{ opacity: props.opacity, width: '100%' }}>
            <img style={imgStyle} onClick={handleClick} src={el.flipped ? el.path : './static/gray.jpg'} />
          </div>
        )}
      </Spring>
    </div>
  )
}

const mapStateToProps = ({ userInfo, cards }) => {
  return { userInfo, cards }
}

export default connect(mapStateToProps)(Card)
