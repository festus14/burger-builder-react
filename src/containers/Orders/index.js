import React, { Component, Fragment } from "react";

import Order from "../../components/Order";
import fAxios from "../../axios-orders";
import Modal from "../../components/UI/Modal";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
    error: ""
  };

  async componentDidMount() {
    try {
      let allOrders = await fAxios.get("/orders.json");
      const fetchedOrders = [];
      for (let key in allOrders.data) {
        fetchedOrders.push({
          ...allOrders.data[key],
          id: key
        });
      }
      this.setState({ loading: false, orders: fetchedOrders });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  }

  render() {
    let error = null;
    if (this.state.error.length >= 1) {
      error = (
        <Modal show modalClosed={() => this.setState({ error: "" })}>
          {this.state.error}
        </Modal>
      );
    }

    return (
      <Fragment>
        {error}
        <div>
          {this.state.orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default Orders;
