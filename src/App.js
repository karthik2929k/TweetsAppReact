import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./FormComponents/UserComponents/LoginForm";
import Register from "./FormComponents/UserComponents/Register";
import ForgotPassword from "./FormComponents/UserComponents/ForgotPassword";
import TweetHome from "./FormComponents/TweetComponents/TweetHome";
import './App.css';
import tweetlogo from "./tweetlogo.png";

const App = () => {

  return (

    <BrowserRouter>
      <div className="logo-heading">
        <img src={tweetlogo} height="40px" alt="tweetapp img" />
        <div>
      <h1 className="text-color">TweetApp</h1>
      </div>
      </div>
      
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/tweetHome' element={<TweetHome />} />
        <Route path='/' element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
