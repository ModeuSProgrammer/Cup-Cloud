import React from 'react'
import { useSpring, animated } from 'react-spring'

const Pie = ({ pieValue }) => {
  const styles = useSpring({
    from: { p: 0 },
    to: { p: pieValue },
    config: { duration: 1000 },
  })

  return (
    <animated.div className="pie" style={{ '--p': styles.p }} />
  )
}

export default Pie 
