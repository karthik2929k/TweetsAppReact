import { useState } from "react";
import NewReply from "./NewReply";
import Reply from "./Reply";
import Update from "./Update";
import "./Tweet.css";
import TweetService from "../../Service/TweetService";
import { useSearchParams} from "react-router-dom";


const Tweet = (props) => {
  const [clickedReply, setClickedReply] = useState(false);
  const [clickedUpdate, setClickedUpdate] = useState(false);
  const [hideFeatures]=useState(props.title==="MyTweets" ? true : false);
  const [searchparams] = useSearchParams();

  const jwttoken=searchparams.get("token");

  function clickReplyHandler() {
    setClickedReply(!clickedReply);
  }
  function clickUpdateHandler() {
    setClickedUpdate(!clickedUpdate);
  }
  function refresh() {
    props.doRefresh();
  }
  async function deleteHandler(event) {
    event.preventDefault();
    await TweetService.deleteTweet(
      props.id,
      props.email,
      jwttoken
    );
    refresh();
  }
  async function likeHandler(event) {
    event.preventDefault();
    await TweetService.likeTweet(
      props.id,
      props.email,
      jwttoken
    );
    refresh();
    
  }

  return (
    <div className="tweet">
      <label className="tweet-control2">@{props.email}</label>
      <label className="tweet-control1">{props.duration}</label>
      <br />
      <label className="tweet-control3">{props.tweet}</label>
      <br />
      <button className="submit-button" onClick={likeHandler}>Likes</button>
      <label className="m-1">{props.like}</label>
      <button className="submit-button" onClick={clickReplyHandler}>Reply</button>
      {hideFeatures && <button className="submit-button"onClick={clickUpdateHandler}>Update</button>}
      {hideFeatures && <button className="submit-button" onClick={deleteHandler}>Delete</button>}


      {clickedReply && (
        <NewReply
          onCancelClick={clickReplyHandler}
          id={props.id}
          email={props.email}
          doRefresh={refresh}
          jwttoken
        />
      )}
      {clickedUpdate && (
        <Update
        onCancelClick={clickUpdateHandler}
          id={props.id}
          email={props.email}
          doRefresh={refresh}
          jwttoken
        />
      )}
    
      <Reply reply={props.reply}/>
     
    </div>
  );
};

export default Tweet;
