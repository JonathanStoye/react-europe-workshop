import React, { Component, createContext } from "react";

const { Provider, Consumer } = createContext()

const Step = () => (
  <Consumer>
    {({ activeStep, hasNext, hasPrevious, stepBack, stepForward }) => (
      <div className="step">
        <h2>{activeStep.title}</h2>
        <p>{activeStep.content}</p>
        <div>
          <button
            className="step-btn"
            disabled={!hasPrevious}
            onClick={stepBack}
          >
            Previous
            </button>
          <button
            className="step-btn"
            disabled={!hasNext}
            onClick={stepForward}
          >
            Next
            </button>
        </div>
      </div>
    )}
  </Consumer>
)

const StepperStatus = () => (
  <Consumer>
    {({ steps, activeStepIndex, setActiveStep }) => (
      <div className="stepper-status">
        {steps.map((step, i) => (
          <React.Fragment key={step.title}>
            <span
              className="status-item"
              onClick={() =>
                setActiveStep(i)
              }
              style={{ color: i === activeStepIndex ? "#000000" : "#aaaaaa" }}
            >
              {step.title}
            </span>
            {i < steps.length - 1 && <span className="status-divider" />}
          </React.Fragment>
        ))}
      </div>
    )}
  </Consumer>
)

export default class Stepper extends Component {
  state = {
    // Assume that the first step is always active at first.
    activeStepIndex: 0
  };

  findActiveStep = step => {
    return step.id === this.state.activeStepId;
  };

  stepForward = () => {
    this.setState(state => {
      return {
        activeStepIndex: state.activeStepIndex + 1
      };
    });
  };

  stepBack = () => {
    this.setState(state => {
      return {
        activeStepIndex: state.activeStepIndex - 1
      };
    });
  };

  setActiveStep = (stepIndex) => {
    this.setState({
      activeStepIndex: stepIndex
    })
  }

  getContext = () => {
    const { steps } = this.props;
    const { activeStepIndex } = this.state;
    const activeStep = steps[activeStepIndex];
    const hasPrevious = activeStepIndex > 0;
    const hasNext = activeStepIndex < steps.length - 1;
    return {
      steps,
      activeStepIndex,
      activeStep,
      hasPrevious,
      hasNext,
      stepBack: this.stepBack,
      stepForward: this.stepForward,
      setActiveStep: this.setActiveStep,
    }
  }

  render() {
    return (
      <div className="stepper">
        <Provider value={this.getContext()}>
          <StepperStatus />
          <Step />
        </Provider>
      </div>
    );
  }
}
