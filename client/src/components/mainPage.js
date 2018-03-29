import React from 'react';
import Reflux from 'reflux';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MainStore from '../stores/mainStore';
import actions from '../actions/actions';
import socketIOClient from "socket.io-client";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import {VictoryPie} from 'victory';

const socket = socketIOClient('http://localhost:3001');
const recentsIcon = <FontIcon className="material-icons">info</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;

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
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <AppBar
      title="Mood Barometer"
      iconElementRight={<FlatButton label="Info"/>}
      />

      Tweets: {this.state.count} Positive: {this.state.positive} Neutral: {this.state.neutral} Negative:{this.state.negative}

      <VictoryPie
      padding={{ top: 20, bottom: 50 }}
      height={150}
      labelRadius={50}
      innerRadius={10}
      style={{ labels: { fill: "black", fontSize: 5, fontWeight: "bold" } }}
  data={[
    { x: "Positive", y: this.state.positive },
    { x: "Neutral", y: this.state.neutral },
    { x: "Negative", y: this.state.negative }
  ]}
/>

      <Paper zDepth={1}>
  <BottomNavigation selectedIndex={this.state.selectedIndex}>
    <BottomNavigationItem
      label="PageOne"
      icon={recentsIcon}
      onClick={() => this.select(0)}
    />
    <BottomNavigationItem
      label="PageTwo"
      icon={favoritesIcon}
      onClick={() => this.select(1)}
    />
  </BottomNavigation>
</Paper>
      </MuiThemeProvider>
    );
  }
}

export default MainPage;
