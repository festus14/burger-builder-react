import React, { Component } from "react";
import { connect } from "react-redux";
import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";

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

  signInHandler = (e) => {
    e.preventDefault();
  };

  signUpHandler = (e) => {
    e.preventDefault();
  };

  forgotPasswordHandler = (e) => {
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
    switch (authState) {
      case "sign-in":
        return (
          <SignIn
            toSignUp={() => this.setState({ authState: "sign-up" })}
            toForgotPassword={() =>
              this.setState({ authState: "forgot-password" })
            }
            authForm={authForms}
            formIsValid={signInFormIsValid}
            onChanged={this.inputChangedHandler}
            signInHandler={this.signInHandler}
          />
        );

      case "forgot-password":
        return (
          <ForgotPassword
            toSignIn={() => this.setState({ authState: "sign-in" })}
            authForm={authForms}
            formIsValid={forgotFormIsValid}
            onChanged={this.inputChangedHandler}
            forgotPasswordHandler={this.forgotPasswordHandler}
          />
        );
      default:
        return (
          <SignUp
            toSignIn={() => this.setState({ authState: "sign-in" })}
            toForgotPassword={() =>
              this.setState({ authState: "forgot-password" })
            }
            authForm={authForms}
            formIsValid={signUpFormIsValid}
            onChanged={this.inputChangedHandler}
            signUpHandler={this.signUpHandler}
          />
        );
    }
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
