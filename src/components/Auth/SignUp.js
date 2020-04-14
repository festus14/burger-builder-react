import React, { Component } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from "./style.css";

export default class SignUp extends Component {
  render() {
    let {
      toSignIn,
      toForgotPassword,
      authForm,
      onChanged,
      signUpHandler,
      formIsValid,
    } = this.props;

    const formElementsArray = [];
    for (let key in authForm) {
      formIsValid = authForm[key].valid && authForm[key].touched && formIsValid;
      formElementsArray.push({
        id: key,
        config: authForm[key],
      });
    }

    let form = (
      <form>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => onChanged(event, formElement.id)}
          />
        ))}
        <Button
          btnType="Success"
          hasBackground="SuccessBackground"
          disabled={!formIsValid}
          clicked={signUpHandler}
        >
          Sign Up
        </Button>
        <Button btnType="Danger" hasBackground="DangerBackground" clicked={toSignIn}>
          Sign In
        </Button>
      </form>
    );

    return (
      <div className={classes.Auth}>
        {form}
        <div onClick={toForgotPassword}>
          <span>Forgot Password?</span>
        </div>
      </div>
    );
  }
}
