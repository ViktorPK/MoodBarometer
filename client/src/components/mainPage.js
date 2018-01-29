import React from 'react';
import Reflux from 'reflux';
import MainStore from '../stores/mainStore';
import actions from '../actions/actions';

class MainPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.stores = [MainStore];
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
