const TWEETAPP_REST_API_URL = "http://65.2.83.138:8090/api/v1.0/tweets";

class TweetService {
  async getMyTweets(email,jwttoken) {
    console.log("tweetservice: " + email);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json","Authorization":"Bearer "+ jwttoken},
    };
    const fetchResponse = await fetch(
      TWEETAPP_REST_API_URL + "/" + email,
      requestOptions
    );
    console.log("fetchResponse: " + fetchResponse);
    return fetchResponse;
  }
  async getAllTweets(jwttoken) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" ,"Authorization":"Bearer "+ jwttoken},
    };
    const fetchResponse = await fetch(
      TWEETAPP_REST_API_URL + "/all",
      requestOptions
    );
    console.log("fetchResponse: " + fetchResponse);
    return fetchResponse;
  }
  async addAReply(id, email, reply,jwttoken) {
    console.log("id: " + id);
    console.log("email: " + email);
    console.log("reply: " + reply);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json","Authorization":"Bearer "+ jwttoken },
      body: JSON.stringify({
        email: email,
        reply: reply,
        replyFrom: email,
      }),
    };
    const fetchResponse = await fetch(
      TWEETAPP_REST_API_URL + "/" + email + "/reply/" + id,
      requestOptions
    );
    console.log("fetchResponse: " + fetchResponse);
    return fetchResponse;
  }
  async updateTweet(id, email, updatedTweet,jwttoken) {
    console.log("id: " + id);
    console.log("email: " + email);
    console.log("updatedTweet: " + updatedTweet);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json","Authorization":"Bearer "+ jwttoken },
      body: JSON.stringify({
        tweet: updatedTweet,
      }),
    };
    const fetchResponse = await fetch(
      TWEETAPP_REST_API_URL + "/" + email + "/update/"+ id,
      requestOptions
    );
    console.log("fetchResponse: " + fetchResponse);
    return fetchResponse;
  }
  async likeTweet(id, email,jwttoken) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" ,"Authorization":"Bearer "+ jwttoken},
      body: JSON.stringify({}),
    };
    const fetchResponse = await fetch(
      TWEETAPP_REST_API_URL + "/" + email + "/like/" + id,
      requestOptions
    );
    return fetchResponse;
  }
  async deleteTweet(id, email,jwttoken) {
    console.log("id: " + id);
    console.log("email: " + email);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json","Authorization":"Bearer "+ jwttoken },
      body: JSON.stringify({}),
    };
    const fetchResponse = await fetch(
      TWEETAPP_REST_API_URL + "/" + email + "/delete/" + id,
      requestOptions
    );
    console.log("fetchResponse: " + fetchResponse);
    return fetchResponse;
  }
}
export default new TweetService();
