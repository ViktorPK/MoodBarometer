import Reflux from 'reflux';
import actions from '../actions/actions';

class TweetsStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      open: false,
      tweets:[],
    };
    this.listenables = actions;
  }
  handleOpen(){
   this.setState({open: true});
 };

 handleClose(){
   this.setState({open: false});
 };
  doStuff(data) {
    var tweets=this.state.tweets;
    tweets.unshift(data);
    this.setState({
      tweets:tweets,
    });
  }
}
export default TweetsStore;
