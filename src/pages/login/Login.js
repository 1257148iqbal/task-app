import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { SET_MESSAGE } from "../../actions/types";
import { userData } from "../../@fake-db/auth";
import {login} from './store/action';


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
}; 

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  //#region Hooks
    const { isLoggedIn } = useSelector(state => state.authReducer);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
  //#endregion

  //#region State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //#endregion

//#region Events
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
   
      const data = userData.find(
        (user) => user.username === username && user.password === password
      );
      
      if(data){
        dispatch(login(username, password));
        props.history.push("/dashboard");
      } else{
        dispatch({
          type: SET_MESSAGE,
          payload: "Please Provide currect Info!",
        });
      }
    } else {
      setLoading(false);
    }
  };

  //#endregion

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
