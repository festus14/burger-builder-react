import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout";
import Orders from "./containers/Orders";
import Auth from "./components/Auth";
import { connect } from "react-redux";
import { checkAuthState } from "./store/actions/auth";
import {
  isAuthenticated,
  hasRefreshToken,
  hasExpiredTime,
} from "./services/Auth";

class App extends Component {
  async componentDidMount() {
    const token = isAuthenticated();
    const refresh = hasRefreshToken();
    const expired = hasExpiredTime();
    const authState = await this.props.onCheckAuthState(
      token,
      refresh,
      expired
    );
    console.log("Auth State: ", authState);
  }

  async componentDidUpdate() {
    const token = isAuthenticated();
    const refresh = hasRefreshToken();
    const expired = hasExpiredTime();
    const authState = await this.props.onCheckAuthState(
      token,
      refresh,
      expired
    );
    console.log("Auth State: ", authState);
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onCheckAuthState: (token, refresh, expired) =>
    dispatch(checkAuthState(token, refresh, expired)),
});

export default connect(null, mapDispatchToProps)(App);
