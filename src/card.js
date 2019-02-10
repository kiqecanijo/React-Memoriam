import React from 'react'
import { connect } from 'react-redux'
import { Spring } from 'react-spring'
import { useSpring, animated } from 'react-spring/hooks'

const Card = ({ handleClick, id, el, userInfo }) => {
  const { transform, opacity } = useSpring({
    opacity: el.flipped || el.solved ? 1 : 0,
    transform: `perspective(600px) rotateX(${el.flipped ? 180 : 0}deg) rotateY(${el.flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 400, friction: 60 }
  })

  const cardSize = window.innerWidth * 0.8 * 0.24

  const cardStyle = {
    position: 'absolute',
    width: cardSize,
    height: cardSize,
    cursor: 'pointer',
    willChange: 'transform, opacity',
    backgroundSize: 'cover'
  }

  const front = {
    ...cardStyle,
    backgroundImage: `url(${el.path})`
  }

  const back = {
    ...cardStyle,
    backgroundImage: `url('./static/gray.jpg')`
  }

  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ duration: 200, delay: id * 300 + 1000, precision	: 0.01 }}>
      {props => (
        <div
          style={{
            opacity: props.opacity,
            height: cardSize,
            width: cardSize
          }}
          className={'card'}
          onClick={handleClick}>

          <animated.div
            style={{
              ...back,
              opacity: opacity.interpolate(o => 1 - o),
              transform
            }}
          />
          <animated.div
            style={{
              ...front,
              opacity,
              transform: transform.interpolate(t => `${t} rotateX(180deg)`)
            }}
          />
        </div>
      )}
    </Spring>
  )
}

const mapStateToProps = ({ userInfo, cards }) => {
  return { userInfo, cards }
}

export default connect(mapStateToProps)(Card)
