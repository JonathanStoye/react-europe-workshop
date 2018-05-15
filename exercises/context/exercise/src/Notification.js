import React from 'react';

import { Consumer as ColorConsumer } from './ColorContext'
import { Consumer as NotifcationConsumer } from './NotificationContext'

export const Notification = ({ children, index }) => (
  <NotifcationConsumer>
    {({ remove }) => (
      <ColorConsumer>
        {({ primaryColor }) => <div onClick={() => remove(index)}>{children}</div>}
      </ColorConsumer>
    )}
  </NotifcationConsumer>
)
