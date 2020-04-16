import React, { Component } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from "./style.css";
import Loader from "../../assets/images/loader.svg";

export default class SignIn extends Component {
  render() {
    let {
      toSignUp,
      toForgotPassword,
      authForm,
      onChanged,
      signInHandler,
      formIsValid,
      isLoading,
    } = this.props;

    const formElementsArray = [];
    formIsValid = true;
    for (let key in authForm) {
      if (key === "name") continue;
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
          clicked={toSignUp}
        >
          Sign Up
        </Button>
        <Button
          btnType="Danger"
          hasBackground="DangerBackground"
          disabled={!formIsValid}
          clicked={signInHandler}
        >
          {isLoading ? <img src={Loader} alt="Loader" /> : "Sign In"}
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
