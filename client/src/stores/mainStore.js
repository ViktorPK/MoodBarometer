import Reflux from 'reflux';
import request from 'superagent';
import actions from '../actions/actions';
const prefix = require('superagent-prefix')('http://localhost:3001')

class MainStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      count: 0,
      positive:0,
      negative:0,
      neutral:0
    };
    this.listenables = actions;
  }

  gotTweet(data){
    this.setState({
      count:data.count,
      positive:data.positive,
      negative:data.negative,
      neutral:data.neutral
    });
  }

  getTweetsCompleted(res) {
  this.setState({
      count: res.body.count,
    });
}

getTweetsFailed(err){
  this.setState({
      count: err.message,
    });
}

}

actions.getTweets.listen(() => {
  request.get('/tweets')
  .use(prefix)
  .end((err, res) => {
    if (err) {
      actions.getTweets.failed(err);
    } else {
      actions.getTweets.completed(res);
    }
  });
});
export default MainStore;
