import Reflux from 'reflux';

const actions = Reflux.createActions({
  getTweets: { asyncResult: true },
  gotTweet: {asyncResult: true},
  getStats: {asyncResult: true},
  doStuff: {asyncResult: true},
});

export default actions;
