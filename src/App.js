import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout";
import Orders from "./containers/Orders";
import Auth from "./components/Auth";
import { connect } from "react-redux";
import { checkAuthState, setToken } from "./store/actions/auth";
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
    if (authState.includes("HOMEPAGE")) {
      const tokenData = {
        idToken: token,
        refreshToken: refresh,
        expiresIn: expired,
      };
      this.props.onSetToken(tokenData);
    } else console.log("Auth State: ", authState);
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
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onCheckAuthState: (token, refresh, expired) =>
    dispatch(checkAuthState(token, refresh, expired)),
  onSetToken: (tokenData) => dispatch(setToken(tokenData)),
});

const mapStateToProps = (state) => ({
  isAuth: state.user.userId,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
