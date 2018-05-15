import React from 'react';
import { Consumer as NotifcationConsumer } from './NotificationContext'
import { Button } from './Button'

export const NotificationButton = ({ children }) => (
  <NotifcationConsumer>
    {({ add }) => <Button onClick={() => add('Whoop Whoop Ice Cream')}>{children}</Button>}
  </NotifcationConsumer>
)
