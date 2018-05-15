import React, { Component } from 'react';
import { Provider as ColorProvider, defaultColor } from './ColorContext';
import { Provider as NotificationProvider } from './NotificationContext';
import { Header } from './Header';
import { Heading } from './Heading';
import { NotificationButton } from './NotificationButton'
import { Notification } from './Notification'
import { Button } from './Button'

class App extends Component {
  state = {
    notifications: [],
    primaryColor: '#20bf6b'
  }

  addNotification = (notification) => {
    this.setState({
      notifications: [
        ...this.state.notifications,
        notification,
      ]
    })
  }

  removeNotification = (index) => {
    let notifications = [...this.state.notifications]
    notifications.splice(index, 1)
    this.setState({
      notifications
    })
  }

  setPrimaryColor = (primaryColor) => {
    this.setState({
      primaryColor
    })
  }

  notificationContext = {
    add: this.addNotification,
    remove: this.removeNotification,
  }

  getColorContext = () => ({
    primaryColor: this.state.primaryColor,
    setPrimaryColor: this.setPrimaryColor,
  })

  render() {
    return (
      <NotificationProvider value={this.notificationContext}>
        <ColorProvider value={this.getColorContext()}>
          {this.state.notifications.map((notification, index) => <Notification key={index} index={index}>{notification}</Notification>)}
          <div>
            <Header>Some Header</Header>
            <Button color={'red'}>red</Button>
            <Button color={'#20bf6b'}>green</Button>
            <Button color={defaultColor}>default</Button>
            <div style={{ padding: 40 }}>
              <Heading>Some Page Content</Heading>
              <p>Some basic text is written here to make you aware of important stuff.</p>
              <NotificationButton>
                Notify
              </NotificationButton>
            </div>
          </div>
        </ColorProvider>
      </NotificationProvider>
    );
  }
}

export default App;
