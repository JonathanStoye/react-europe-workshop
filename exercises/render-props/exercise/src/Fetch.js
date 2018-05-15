import React, { Component } from 'react';


const fakeFetch = url => new Promise(resolve => {
  setTimeout(() => {
    resolve('Go Zen')
  }, 1000)
})

class Fetch extends Component {
  state = {
    loading: true,
    error: null,
    data: null,
  }

  componentDidMount() {
    fakeFetch(this.props.url)
      .then((data) => {
        this.setState({
          data,
          loading: false,
        })
      })
      .catch((error) => {
        this.setState({
          error,
          loading: false,
        })
      })
  }

  render() {
    return this.props.children(this.state)
  }
}

export default Fetch;
