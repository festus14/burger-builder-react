import React, { Fragment } from "react";

import classes from "./style.css";
import NavigationItem from "./NavigationItem";
import { Link } from "react-router-dom";
import userIcon from "../../../assets/images/user-icon.svg";
import { connect } from "react-redux";
import { logOut } from "../../../store/actions";
import Logo from "../../Logo";

const navigationItems = (props) => {
  const { onLogOut, isAuth, displayName } = props;
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        <span>
          <Logo height={30} width={25} />
        </span>{" "}
        Burger Builder
      </NavigationItem>
      {isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
      <li className={classes.Profile}>
        <div style={{ textAlign: "center", minWidth: "35px" }}>
          <img width="20px" src={userIcon} alt="User" />
          <span className={classes.Label}>Profile</span>
        </div>
        <div className={classes.DropDownOptions}>
          {isAuth ? (
            <Fragment>
              <Link to="/">{displayName ? displayName : "Profile"}</Link>
              <Link to="/orders">My Orders</Link>
              <Link to="/auth" onClick={onLogOut}>
                Log Out
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link to="/auth">Log in</Link>
            </Fragment>
          )}
        </div>
      </li>
    </ul>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.user.userId,
  displayName: state.user.displayName,
});

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(navigationItems);
