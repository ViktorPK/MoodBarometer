import Reflux from 'reflux';

const actions = Reflux.createActions({
  getTweets: { asyncResult: true },
  gotTweet: {asyncResult: true},
  getStats: {asyncResult: true},
  doStuff: {asyncResult: true},
  onStart: {asyncResult: true},
  handleOpen:{asyncResult: true},
  handleClose:{asyncResult:true},
});

export default actions;
