import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary";
import ContactData from "./ContactData";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let sum = 0;
    for (const key in this.props.ingredients) {
      if (this.props.ingredients.hasOwnProperty(key)) {
        const element = this.props.ingredients[key];
        sum += element;
      }
    }
    let summary = sum >= 1 ? (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.props.ingredients}
              price={this.props.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    ) : (
      <div>
        <Redirect to="/" />
      </div>
    );
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients.ingredients,
    totalPrice: state.ingredients.totalPrice,
  };
};

export default connect(mapStateToProps)(Checkout);
