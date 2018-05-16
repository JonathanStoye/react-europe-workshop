import React, { Component, Fragment } from "react";

export default class ChatInput extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      localStorage.setItem("pendingMessage", this.props.value);
    }
  }

  render() {
    const { value, onChange, onSubmit } = this.props;
    return (
      <Fragment>
        <div className="input-group mb-3">
          <input
            style={{ height: 70 }}
            type="text"
            className="form-control"
            placeholder="Enter a message..."
            value={value}
            onChange={onChange}
          />
          <div className="input-group-append">
            <button
              onClick={onSubmit}
              className="btn btn-success"
              type="button"
            >
              Button
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}
