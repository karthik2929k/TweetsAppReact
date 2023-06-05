import React, { useState } from 'react';
import { Link } from "react-router-dom";
import UserService from "../../Service/UserService";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [emailmessage, setEmailMessage] = useState("");
  const [pwmessage, setPwMessage] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const errorMsg="wrong validations";

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };
  const genderHandler = (event) => {
    setGender(event.target.value);
  };
  const dateHandler = (event) => {
    setDate(event.target.value);
  };
  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  async function registerHandler(event) {
    event.preventDefault();
    const registerCredintals = {
      email: email,
      lastName: lastName,
      gender: gender,
      date: date,
      firstName: firstName,
      password: password
    };
    const fetchResponse = await UserService.registerUser(registerCredintals);
    const responseData = await fetchResponse.json();
    console.log(responseData);
    if (responseData !== null) {
      console.log("ResponseData: " + responseData);
      if (true === responseData) {
        setRegisterStatus("Registration success");
      }
      if (false === responseData) {
        setRegisterStatus("UserAlreadyRegistered");
      }
      if(errorMsg === responseData.errorMessage){
        const errmsg = responseData.validationMessage;
        if(errmsg.includes("Email")){
            setEmailMessage(errmsg);
        }else{
            setPwMessage(errmsg);
        }
      }
    }
  }
  return (
    <div className="registration-form-container">
      <div className="view-container">
        <form onSubmit={registerHandler}>
          <label className="input-label" htmlFor="email">Email</label>
          <br />
          <input
          className="label-container"
            name="email"
            id="email"
            type="text"
            required
            onChange={emailHandler}
            value={email}
          ></input>
          <br />
          <label >{emailmessage}</label>
          <br/>
          <label className="input-label" htmlFor="text">FirstName</label>
          <br />
          <input
          className="label-container"
            name="firstName"
            id="firstName"
            type="text"
            required
            onChange={firstNameHandler}
            value={firstName}
          ></input>
          <br />
          <label className="input-label" htmlFor="lastName">LastName</label>
          <br />
          <input
          className="label-container"
            name="lastName"
            id="lastName"
            type="text"
            required
            onChange={lastNameHandler}
            value={lastName}
          ></input>
          <br />
          <label className="input-label" htmlFor="gender">Gender</label>
          <br />
          <input
          className="label-container"
            name="gender"
            id="gender"
            type="text"
            required
            onChange={genderHandler}
            value={gender}
          ></input>
          <br />
          <label className="input-label" htmlFor="date">Date</label>
          <br />
          <input
          className="label-container"
            name="date"
            id="date"
            type="date"
            required
            onChange={dateHandler}
            value={date}
          ></input>
          <br />
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
          <label >{pwmessage}</label>
          <br/>
          <button className="submit-button" type='submit'> SignUp</button>
        </form>
        <div className="auth-option text-center pt-2">Have an account? <Link className="text-link" to="/login" >Sign in</Link></div>
        <p>{registerStatus}</p>
      </div>
    </div>
  )
}

export default Register