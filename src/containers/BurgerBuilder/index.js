import React, { Component, Fragment } from "react";
import fAxios from "../../axios-orders";

import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/BuildControls";
import Modal from "../../components/UI/Modal";
import Spinner from "../../components/UI/Spinner";
import OrderSummary from "../../components/Burger/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    name: "",
    email: "",
    street: "",
    zipCode: null,
    totalPrice: 4,
    deliveryMethod: null,
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

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = async () => {
    this.setState({ loading: true });
    let order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: this.state.name,
        email: this.state.email,
        address: {
          street: this.state.street,
          zipCode: this.state.zipCode,
          country: "Nigeria"
        }
      },
      deliveryMethod: "Express"
    };

    try {
      const orderRes = await fAxios.post("/orders.json", order);
      console.log(orderRes);
      alert("You just purchased: ", orderRes.data)
      this.setState({ loading: false });
    } catch (error) {
      console.log(error.message);
      this.setState({ loading: false });
    }
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // {salad: true, meat: false, ...}

    let orderSummary = null;
    let burger = <Spinner />;
    if (!this.state.loading) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
          />
        </Fragment>
      );

      orderSummary = this.state.loading ? (
        <Spinner />
      ) : (
        <OrderSummary
          name={this.state.name}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    let error = null;
    if (this.state.error.length >= 1) {
      error = (
        <Modal show modalClosed={() => this.setState({ error: '' })}>
          {this.state.error}
        </Modal>
      );
    }

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

export default BurgerBuilder;
