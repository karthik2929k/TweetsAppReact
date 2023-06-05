import Tweet from "./Tweet";


const Tweets = (props) => {
  function refresh() {
     props.doRefresh();
  
  }

  if(props.tweetList===null||props.tweetList.length===0){
  return <p>No tweets</p>}

  return (
    <div>
      <h5>{props.title}</h5>
      {props.tweetList.map((tweet) => (
        <Tweet
          key={tweet.id}
          id={tweet.id}
          email={tweet.email}
          tweet={tweet.tweet}
          tweetTime={tweet.tweetTime}
          reply={tweet.reply}
          like={tweet.likes}
          duration={tweet.duration}
          globalUserName={props.globalUserName}
          title={props.title}
          doRefresh={refresh}
        />
      ))}
       
    </div>
  );
};

export default Tweets;