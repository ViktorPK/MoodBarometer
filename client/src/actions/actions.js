import Reflux from 'reflux';

const actions = Reflux.createActions({
  getTweets: { asyncResult: true },
  gotTweet: {asyncResult: true},
});

export default actions;
