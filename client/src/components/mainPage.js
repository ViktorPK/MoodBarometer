import React from 'react';
import Reflux from 'reflux';
import MainStore from '../stores/mainStore';
import actions from '../actions/actions';
import socketIOClient from "socket.io-client";
const socket = socketIOClient('http://localhost:3001');

class MainPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.stores = [MainStore];
  }
  componentDidMount(){
    socket.on('tweet', function (data) {
    actions.gotTweet(data);
});
  }
  render() {

    return (
      <div>
      <div>
      <button  onClick={() => actions.getTweets()}> UPDATE </button>
      </div>

      <div>
      Tweets: {this.state.count}
      </div>
      </div>
    );
  }
}

export default MainPage;
