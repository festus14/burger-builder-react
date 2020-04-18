import React, { Component, Fragment } from "react";
import { getOrders } from "../../store/actions";

import Order from "../../components/Order";
import Modal from "../../components/UI/Modal";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner";

class Orders extends Component {
  state = {
    error: "",
  };

  async componentDidMount() {
    let error = await this.props.onGetOrders(this.props.token, this.props.userId);
    if (error) this.setState({ error: error });
  }

  render() {
    const { error } = this.state;
    const props = this.props;

    let errors = null;
    if (error.length >= 1) {
      errors = (
        <Modal show modalClosed={() => this.setState({ error: "" })}>
          <div style={{ textAlign: "center" }}>{error}</div>
        </Modal>
      );
    }

    let order = <Spinner />;
    if (!props.isLoading) {
      order = (
        <div>
          {props.orders.map((order) => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          ))}
        </div>
      );
    }

    return (
      <Fragment>
        {errors}
        {order}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
  isLoading: state.ui.isOrderLoading,
  token: state.auth.token,
  userId: state.user.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onGetOrders: (token, userId) => dispatch(getOrders(token, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
