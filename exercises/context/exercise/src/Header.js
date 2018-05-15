import React from 'react';

import { Consumer } from './ColorContext'

export const Header = ({ children }) => (
  <Consumer>
    {({ primaryColor }) => <div className="header" style={{ backgroundColor: primaryColor }}>{children}</div>}
  </Consumer>
)
