import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./portal-app.css";

export class PortalModal extends Component {
  portalElement = document.createElement('div')

  componentDidMount() {
    document.body.appendChild(this.portalElement)
  }

  componentWillUnmount() {
    document.body.removeChild(this.portalElement)
  }

  render() {
    const { coordinates, close } = this.props
    return ReactDOM.createPortal(<div className="portalModal" style={{ left: coordinates.x, top: coordinates.y }}>Hi I'm a regular modal!!<span onClick={() => close()}>x</span></div>, this.portalElement);
  }
}

export class PortalApp extends Component {
  state = {
    isModalOpen: false
  }

  getModalCoordinates = () => {
    if (this.buttonWrapper) {
      const boundingRect = this.buttonWrapper.getBoundingClientRect()

      this.setState({
        modalCoordinates: {
          x: boundingRect.left,
          y: boundingRect.bottom + 10,
        }
      })
    }
  }

  toggleModal = () => {
    if (!this.state.isModalOpen) {
      this.getModalCoordinates()
    }
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  render() {
    return (
      <div className="pageWrapper">
        <div className={`containerDiv lightTheme`}>
          <h1>Portals!!!!</h1>
          <div className="settingsButtonWrapper" ref={(element) => this.buttonWrapper = element}>
            <button className="settingsButton" onClick={this.toggleModal}>
              settings
            </button>
            {this.state.isModalOpen ? <PortalModal coordinates={this.state.modalCoordinates} close={this.toggleModal} /> : null}
          </div>
          <p>Portals are great!</p>
          <p>Here is some more content about portals</p>
          <p>Here is some more content about portals</p>
          <p>Here is some more content about portals</p>
          <p>Here is some more content about portals</p>
          <p>Here is some more content about portals</p>
          <p>Here is some more content about portals</p>
          <p>Here is some more content about portals</p>
          <p>Here is some more content about portals</p>
          <p>Here is some more content about portals</p>
          <p>Here is some more content about portals</p>
          <p>Here is some more content about portals</p>
        </div>
      </div>
    );
  }
}

export default PortalApp;
