import React, { Component, Fragment, forwardRef } from "react";

export class ErrorBoundary extends Component {
  state = {
    error: null
  };

  componentDidCatch(error, info) {
    const { onError } = this.props;
    onError(error, info);
    this.setState({ error });
  }

  render() {
    const { Fallback, children } = this.props;
    const { error } = this.state;
    if (error !== null) {
      return <Fallback />;
    }
    return <Fragment>{children}</Fragment>;
  }
}

export const withErrorBoundary = (WrapperdCommponent, onError, Fallback) =>
  forwardRef((props, ref) => (
    <ErrorBoundary onError={onError} Fallback={Fallback}>
      <WrapperdCommponent {...props} ref={ref} />
    </ErrorBoundary>
  ));
