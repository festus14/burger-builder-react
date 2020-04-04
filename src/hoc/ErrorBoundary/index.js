import React, { Component, Fragment } from "react";
import Modal from "../../components/UI/Modal";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, error: error, info: info });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      // return <h1>Something went wrong.</h1>;
      return (
        <Fragment>
          <Modal show>Error Here, </Modal>
        </Fragment>
      );
    }
    return this.props.children;
  }
}
