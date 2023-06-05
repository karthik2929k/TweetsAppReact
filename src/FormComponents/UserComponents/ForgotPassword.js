import React ,{useState}from 'react'
import UserService from "../../Service/UserService";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
const ForgotPassword = () => {

    const[email ,setEmail]=useState("");
    const[firstName ,setFirstName]=useState("");
    const[newPassword ,setNewPassword]=useState("");
    const[date ,setDate]=useState("");
    const[passwordStatus,setPasswordStatus]=useState("");

    const emailHandler = (event) => {
        setEmail(event.target.value);
      };
      const dateHandler = (event) => {
        setDate(event.target.value);
      };
    const firstNameHandler = (event) => {
        setFirstName(event.target.value);
      };
    const newPasswordHandler = (event) => {
        setNewPassword(event.target.value);
      };
      async function forgotPasswordHandler(event){
        event.preventDefault();
        const NewPassword={
            date:date,
            firstName:firstName,
            newPassword:newPassword
    
        };
        const fetchResponse = await UserService.forgotPassword(NewPassword,email);
        const responseData = await fetchResponse.json();
        console.log(responseData);
        if (responseData !== null) {
            console.log("ResponseData: " + responseData);
            if (responseData===true) {
              setPasswordStatus("PasswordChanged");
            }
            if (responseData===false) {
              setPasswordStatus("Wrong Credintals");
            }
          }


        }

  return (
    <div className="registration-form-container">
      <div className="view-container">
        <form onSubmit={forgotPasswordHandler}>
        <div className="input-container">
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
        <label className="input-label" htmlFor="newPassword">NewPassword</label>
        <br />
        <input
        className="label-container"
          name="newPassword"
          id="newPassword"
          type="password"
          required
          onChange={newPasswordHandler}
          value={newPassword}
        ></input>
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
        <br/>
         <label className="input-label" htmlFor="date">Date</label>
         <br/>
        <input
        className="label-container"
          name="date"
          id="date"
          type="date"
          required
          onChange={dateHandler}
          value={date}
        ></input>
        <br/>

        <button className="submit-button" type='submit'>ForgotPassword</button>
        </div>
        </form>
       
        <Link to="/login" >Back to Login</Link>
        <p>{passwordStatus}</p>
        </div>
      </div>
   
  )
}
export default ForgotPassword;