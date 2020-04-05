import React, { Component, Fragment } from "react";
import fAxios from "../../axios-orders";
import { connect } from "react-redux";
import {
  addIngredients,
  removeIngredients
} from "../../store/actions/ingredients";

import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/BuildControls";
import Modal from "../../components/UI/Modal";
import Spinner from "../../components/UI/Spinner";
import OrderSummary from "../../components/Burger/OrderSummary";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: ""
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      let ingredients = await fAxios.get("/ingredients.json");
      this.setState({ ingredients: ingredients.data, loading: false });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = async () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = <Spinner />;
    if (!this.state.loading) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            price={this.props.price}
            ingredients={this.props.ingredients}
          />
        </Fragment>
      );

      orderSummary = this.state.loading ? (
        <Spinner />
      ) : (
        <OrderSummary
          name={this.state.name}
          ingredients={this.state.ingredients}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    let error = null;
    if (this.state.error.length >= 1) {
      error = (
        <Modal show modalClosed={() => this.setState({ error: "" })}>
          {this.state.error}
        </Modal>
      );
    }

    console.log('Burgerbuilder', this.props)

    return (
      <Fragment>
        {error}
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.ingredients.ingredients,
  price: state.ingredients.totalPrice
});

const mapDispatchToProps = dispatch => ({
  onAddIngredient: ingName => dispatch(addIngredients(ingName)),
  onRemoveIngredient: ingName => dispatch(removeIngredients(ingName))
});

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
