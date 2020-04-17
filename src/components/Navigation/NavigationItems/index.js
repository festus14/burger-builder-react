import React from "react";

import classes from "./style.css";
import NavigationItem from "./NavigationItem";
import { Link } from "react-router-dom";
import userIcon from "../../../assets/images/user-icon.svg";
import { connect } from "react-redux";
import { logOut } from "../../../store/actions";

const navigationItems = (props) => {
  console.log(props);
  const { onLogOut } = props;
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <li className={classes.Profile}>
        <div style={{ textAlign: "center", minWidth: "35px" }}>
          <img width="20px" src={userIcon} alt="User" />
        </div>
        <div className={classes.DropDownOptions}>
          <Link to="/">Profile</Link>
          <Link to="/auth">Log in</Link>
          <Link to="/">My Orders</Link>
          <Link to="/auth" onClick={onLogOut}>
            Log Out
          </Link>
        </div>
      </li>
    </ul>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.idToken,
});

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(navigationItems);
