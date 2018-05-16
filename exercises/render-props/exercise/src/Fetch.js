import React, { Component } from "react";

class Fetch extends Component {
  state = {
    loading: true,
    error: null,
    data: null
  };

  componentDidMount() {
    fetch(this.props.url)
      .then(res => res.json())
      .catch(error => {
        this.setState({
          error,
          loading: false
        });
      });
  }

  render() {
    return this.props.children(this.state);
  }
}

export default Fetch;
