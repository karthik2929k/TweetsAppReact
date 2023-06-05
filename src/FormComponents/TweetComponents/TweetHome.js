import React, { useState, useCallback, useEffect } from 'react';
import UserService from "../../Service/UserService";
import TweetService from "../../Service/TweetService"
import Tweets from "./Tweets";
import "./TweetHome.css"
import ViewAllUsers from './ViewAllUsers';
import { useSearchParams, Link } from "react-router-dom";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [newTweet, setNewTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [allTweets, setAllTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [viewAllUsers, setViewAllUsers] = useState(false);
  const [viewAllTweets, setViewAllTweets] = useState(false);
  const [viewMyTweets, setViewMyTweets] = useState(false);
  const [reload, setReload] = useState(false);
  const [searchparams] = useSearchParams();

  const email = searchparams.get("id");
  const jwttoken=searchparams.get("token");

  const tweetHandler = (event) => {
    setTweet(event.target.value);
  };

   function viewAllTweetsHandler(){
    setViewAllTweets(true);
    setViewMyTweets(false);
    setViewAllUsers(false);

  }
  function viewMyTweetsHandler() {
    setViewAllTweets(false);
    setViewMyTweets(true);
    setViewAllUsers(false);
  }

  async function viewAllUsersHandler() {
    setViewAllUsers(true);
    setViewAllTweets(false);
    setViewMyTweets(false);
    const fetchResponse = await UserService.getAllUsers(jwttoken);
    const responseData = await fetchResponse.json();
    console.log(responseData);
    const userList = responseData.userList;
    setUsers(userList);

  }

  const refresh = () => {
    setReload(!reload);

  }
  const getTweets = useCallback(async () => {
    const fetchResponse = await TweetService.getMyTweets(email,jwttoken);
    const responseData = await fetchResponse.json();
    console.log(responseData);
    const tweetList = responseData.tweetList;
    setTweets(tweetList);
  }, [email,jwttoken]);

  useEffect(() => {
    getTweets();
  }, [getTweets, reload, newTweet]);

  const getAllTweets = useCallback(async () => {
    const fetchResponse = await TweetService.getAllTweets(jwttoken);
    const responseData = await fetchResponse.json();
    console.log(responseData);
    const tweetList = responseData.tweetList;
    setAllTweets(tweetList);
  }, [jwttoken]);

  useEffect(() => {
    getAllTweets();
  }, [getAllTweets, reload, newTweet]);
  //


  async function createTweetHandler(event) {
    event.preventDefault();
    const tweetData = {
      tweet: tweet
    };
    console.log("createtoken"+jwttoken);
    const fetchResponse = await UserService.createTweet(tweetData, email,jwttoken);
    const responseDataTweet = await fetchResponse.json();
    console.log(responseDataTweet);
    console.log("tweet posted");
    if (responseDataTweet !== null) {
      console.log("ResponseDataTweet: " + responseDataTweet);
      setNewTweet(responseDataTweet);
    }

  }

  return (
      <div className="tweet-container">
        <form onSubmit={createTweetHandler}>
          <div className="input-container">
            <label className="input-label" htmlFor="tweet">Tweet</label>
            <br />
            <input
              name="tweet"
              id="tweet"
              type="text"
              onChange={tweetHandler}
              value={tweet}
              required
            ></input>
            <button className="submit-button" type='submit' >Create Tweet</button>
          </div>
        </form>
        <br />
        <button className="submit-button" onClick={viewMyTweetsHandler}>viewMyTweets</button>
        <button className="submit-button" onClick={viewAllTweetsHandler}>viewAllTweets</button>
        <button className="submit-button" onClick={viewAllUsersHandler} >viewAllUsers</button>
        <button className="btn btn-outline-primary "><Link to="/">Logout</Link></button>

        {viewMyTweets && <Tweets tweetList={tweets} globalUserName={email} title={"MyTweets"} doRefresh={refresh} />}
        {viewAllUsers && <ViewAllUsers usersList={users}></ViewAllUsers>}
        {viewAllTweets && <Tweets tweetList={allTweets} globalUserName={email} title={"AllTweets"} doRefresh={refresh} />}
      </div>
  )
}

export default Home