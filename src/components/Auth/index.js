import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";
import { signUp, logIn } from "../../store/actions";
import Modal from "../UI/Modal";

export class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authState: "sign-up",
      authForms: {
        name: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Your Name",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Your E-Mail",
          },
          value: "",
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
          touched: false,
        },
        password: {
          elementType: "input",
          elementConfig: {
            type: "password",
            placeholder: "Password",
          },
          value: "",
          validation: {
            required: true,
            minLength: 8,
            maxLength: 12,
          },
          valid: false,
          touched: false,
        },
      },
      signInFormIsValid: false,
      signUpFormIsValid: false,
      forgotFormIsValid: false,
      error: "",
    };
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedAuthForm = {
      ...this.state.authForms,
    };
    const updatedFormElement = {
      ...updatedAuthForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedAuthForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    this.setState({ authForms: updatedAuthForm });
    switch (this.state.authState) {
      case "sign-up":
        for (let inputIdentifier in updatedAuthForm) {
          formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ signUpFormIsValid: formIsValid });
        break;
      case "sign-in":
        for (let inputIdentifier in updatedAuthForm) {
          if (inputIdentifier === "name") continue;
          formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ signInFormIsValid: formIsValid });
        break;
      case "forgot-password":
        for (let inputIdentifier in updatedAuthForm) {
          if (inputIdentifier === "name" || inputIdentifier === "password") {
            continue;
          }
          formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ forgotFormIsValid: formIsValid });
        break;
      default:
        break;
    }
    this.setState({ formIsValid: formIsValid });
  };

  signInHandler = async (e) => {
    e.preventDefault();
    let authForms = this.state.authForms;
    let error = await this.props.onSignIn(
      authForms.email.value,
      authForms.password.value
    );
    if (!error) {
      this.props.history.push("/");
    } else {
      this.setState({ error: error });
    }
  };

  signUpHandler = async (e) => {
    e.preventDefault();
    let authForms = this.state.authForms;
    let error = await this.props.onSignUp(
      authForms.email.value,
      authForms.password.value,
      authForms.name.value
    );
    if (!error) {
      this.props.history.push("/");
    } else {
      this.setState({ error: error });
    }
  };

  forgotPasswordHandler = async (e) => {
    e.preventDefault();
  };

  render() {
    const {
      authForms,
      authState,
      signInFormIsValid,
      signUpFormIsValid,
      forgotFormIsValid,
    } = this.state;

    const { isLoading } = this.props;

    let error = null;
    if (this.state.error.length >= 1) {
      error = (
        <Modal show modalClosed={() => this.setState({ error: "" })}>
          <div style={{ textAlign: "center" }}>{this.state.error}</div>
        </Modal>
      );
    }

    switch (authState) {
      case "sign-in":
        return (
          <Fragment>
            {error}
            <SignIn
              toSignUp={() => this.setState({ authState: "sign-up" })}
              toForgotPassword={() =>
                this.setState({ authState: "forgot-password" })
              }
              authForm={authForms}
              formIsValid={signInFormIsValid}
              onChanged={this.inputChangedHandler}
              signInHandler={this.signInHandler}
              isLoading={isLoading}
            />
          </Fragment>
        );

      case "forgot-password":
        return (
          <Fragment>
            {error}
            <ForgotPassword
              toSignIn={() => this.setState({ authState: "sign-in" })}
              authForm={authForms}
              formIsValid={forgotFormIsValid}
              onChanged={this.inputChangedHandler}
              forgotPasswordHandler={this.forgotPasswordHandler}
              isLoading={isLoading}
            />
          </Fragment>
        );
      default:
        return (
          <Fragment>
            {error}
            <SignUp
              toSignIn={() => this.setState({ authState: "sign-in" })}
              toForgotPassword={() =>
                this.setState({ authState: "forgot-password" })
              }
              authForm={authForms}
              formIsValid={signUpFormIsValid}
              onChanged={this.inputChangedHandler}
              signUpHandler={this.signUpHandler}
              isLoading={isLoading}
            />
          </Fragment>
        );
    }
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.ui.isUserLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onSignUp: (email, password, username) =>
    dispatch(signUp(email, password, username)),
  onSignIn: (email, password) => dispatch(logIn(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
