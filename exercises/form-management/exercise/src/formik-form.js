import React, { Component } from "react";
import { Formik, Form, Field } from "formik";

import "./formik-form.css";

export class Content extends Component {
  renderChoices = submission =>
    Object.keys(submission).map(key => {
      if (key !== "name") {
        const value = submission[key] ? `✔️` : `⤬`;
        return (
          <p key={key}>
            {key}: {value}
          </p>
        );
      }
      return null;
    });

  renderSubmissions = submissions => (
    <ul>
      {submissions.map((submission, index) => (
        <li key={`${submission.name}${index}`}>
          <p style={{ fontWeight: "bold" }}>{submission.name}</p>
          {this.renderChoices(submission)}
        </li>
      ))}
    </ul>
  );
  render() {
    const { submissions } = this.props;

    return (
      <div className="contentWrapper">
        {this.renderSubmissions(submissions)}
      </div>
    );
  }
}

export default class FormikForm extends Component {
  state = {
    submissions: []
  };

  handleSubmit = submission => {
    this.setState({
      submissions: this.state.submissions.concat(submission)
    });
  };

  // we'd also have to have several onChange handlers and, of course, a more useful submit method!

  render() {
    console.log(this.state.submissions);
    return (
      <div className="pageWrapper">
        <div className="formWrapper">
          <Formik
            onSubmit={(values, actions) => {
              this.handleSubmit(values);
              actions.resetForm();
            }}
            initialValues={{
              name: "",
              react: false,
              formik: false,
              redux: false,
              grapql: false,
              reactNative: false,
              node: false
            }}
            render={({ values, handleChange }) => (
              <Form className="form">
                <label htmlFor="name">What's your name?</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  onChange={handleChange}
                  value={values.name}
                  required
                />
                <p>Which of the following technologies have you used?</p>
                <label htmlFor="react">React</label>
                <Field
                  type="checkbox"
                  onChange={handleChange}
                  id="react"
                  name="react"
                  checked={values.react}
                />
                <label htmlFor="formik">Formik</label>
                <Field
                  type="checkbox"
                  onChange={handleChange}
                  id="formik"
                  name="formik"
                  checked={values.formik}
                />
                <label htmlFor="redux">Redux</label>
                <Field
                  type="checkbox"
                  onChange={handleChange}
                  id="redux"
                  name="redux"
                  checked={values.redux}
                />
                <label htmlFor="grapql">GraphQL</label>
                <Field
                  type="checkbox"
                  onChange={handleChange}
                  id="grapql"
                  name="grapql"
                  checked={values.graphql}
                />
                <label htmlFor="reactNative">ReactNative</label>
                <Field
                  type="checkbox"
                  onChange={handleChange}
                  id="reactNative"
                  name="reactNative"
                  checked={values.reactNative}
                />
                <label htmlFor="node">Node</label>
                <Field
                  type="checkbox"
                  onChange={handleChange}
                  id="node"
                  name="node"
                  checked={values.node}
                />
                <button className="submitButton" type="submit">
                  Submit Form
                </button>
              </Form>
            )}
          />
        </div>
        <Content submissions={this.state.submissions} />
      </div>
    );
  }
}
