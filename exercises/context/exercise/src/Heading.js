import React from 'react';

import { Consumer } from './ColorContext'

export const Heading = ({ children }) => (
  <Consumer>
    {({ primaryColor }) => <div className="heading" style={{ color: primaryColor }}>{children}</div>}
  </Consumer>
)
