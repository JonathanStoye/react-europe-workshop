import React from 'react';
import { Consumer as ColorConsumer } from './ColorContext'

export const Button = ({ children, onClick, color }) => (
  <ColorConsumer>
    {({ primaryColor, setPrimaryColor }) => {
      const click = () => {
        if (onClick) {
          onClick()
        }
        if (color) {
          setPrimaryColor(color)
        }
      }
      return <button className="button" onClick={click} style={{ backgroundColor: primaryColor }}>{children}</button>
    }}
  </ColorConsumer >
)
