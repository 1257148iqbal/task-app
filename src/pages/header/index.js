
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../login/store/action";
import logo from '../../assets/imges/logo.png';


const Header = () => {
  const { user: currentUser } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]); 



  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
    <Link to={"/dashboard"} className="navbar-brand">
      <img src={logo} alt="logo" width="50px"/>
    </Link>

    {currentUser && (
      <div className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to={"/dashboard"} className="nav-link">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/members"} className="nav-link">
            Members
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/tasks"} className="nav-link">
            Tasks
          </Link>
        </li>
      </div>
    )}

    {currentUser ? (
      <div className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to={"/profile"} className="nav-link">
            {currentUser.username}
          </Link>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link" onClick={logOut}>
            Logout
          </a>
        </li>
      </div>
    ) : (
      <div className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to={"/"} className="nav-link">
            Login
          </Link>
        </li>
      </div>
    )}
  </nav>
  );
};

export default Header;
