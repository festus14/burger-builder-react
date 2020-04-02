import React, { Component } from "react";

import Button from "../../../components/UI/Button";
import Spinner from "../../../components/UI/Spinner";
import classes from "./style.css";
import fAxios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = async event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Festus Omole",
        address: {
          street: "Teststreet 1",
          zipCode: "10115",
          country: "Nigeria"
        },
        email: "test@test.com"
      },
      deliveryMethod: "Express"
    };

    try {
      const orderRes = await fAxios.post("/orders.json", order);
      console.log(orderRes);
      this.setState({ loading: false });
      this.props.history.push("/");
    } catch (error) {
      console.log(error.message);
      this.setState({ loading: false });
    }
    //     axios
    //       .post("/orders.json", order)
    //       .then(response => {
    //         this.setState({ loading: false });
    //         this.props.history.push("/");
    //       })
    //       .catch(error => {
    //         this.setState({ loading: false });
    //       });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
