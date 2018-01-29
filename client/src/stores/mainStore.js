import Reflux from 'reflux';
import request from 'superagent';
import actions from '../actions/actions';
const prefix = require('superagent-prefix')('http://localhost:3001')

class MainStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
    this.listenables = actions;
  }

  getTweetsCompleted(res) {
  //   var socket = io();
  //   window.alert(socket.path);
  // //   socket.on('count', function (data) {
  // //   this.setState({
  // //     count: {data},
  // //   });
  // // });
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

// how to get actual email and password of component!
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
