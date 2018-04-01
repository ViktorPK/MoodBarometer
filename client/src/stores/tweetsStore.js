import Reflux from 'reflux';
import actions from '../actions/actions';

class TweetsStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      tweets:[],
    };
    this.listenables = actions;
  }

  doStuff(data) {
    var tweets=this.state.tweets;
    tweets.unshift(data);
    this.setState({
      tweets:tweets,
    });
  }
}
export default TweetsStore;
