import React, { useState } from "react";
import UserService from "../../Service/UserService";
import "./LoginForm.css";
import { Link, useNavigate, createSearchParams } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorContent, setErrorContent] = useState("");


  const userNameHandler = (event) => {
    setUserName(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };


  async function loginHandler(event) {
    event.preventDefault();
    console.log(userName);
    console.log(password);
    const userCredentials = {
      username: userName,
      password: password

    };
    const fetchResponse = await UserService.validateLogin(userCredentials);
    const responseData = await fetchResponse.json();
    console.log(responseData);
    if (responseData !== null) {
      let loginResponse = responseData.jwtToken;
      console.log("LoginResponse: " + loginResponse);
      console.log("ResponseData: " + responseData);
      if(loginResponse){
      setErrorContent("Login Success");
      navigate({
        pathname: "/TweetHome",
        search: createSearchParams({
          id: userName,
          token: responseData.jwtToken
        }).toString()
      
      });
    }

      if (false === responseData) {
        setErrorContent("Not valid Credentials");
      }
    }
  };

  return (

    <div className="registration-form-container">
      <div className="view-container">
        <form onSubmit={loginHandler}>
          <div className="input-container">
            <label className="input-label" htmlFor="userName">UserName</label>
            <br />
            <input
              className="label-container"
              name="userName"
              id="userName"
              type="text"
              required
              onChange={userNameHandler}
              value={userName}
            ></input>
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password">Password</label>
            <br />
            <input
              className="label-container"
              name="password"
              id="password"
              type="password"
              required
              onChange={passwordHandler}
              value={password}
            ></input>
          </div>
          <div className="col-2">
            <div className="forgot-password text-end">
              <Link to="/ForgotPassword">Forgot password?</Link>
            </div>
          </div>
          <div className="text-left">
            <button type="submit" className="submit-button">Log In</button>
          </div>

        </form>
        <p className="text-color">{errorContent}</p>
        <div className="auth-option text-left pt-2">No Account? <Link className="text-link" to="/Register" >Sign up </Link></div>
      </div>
    </div>
  );
};

export default LoginForm;
