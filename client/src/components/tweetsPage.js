import React from 'react';
import Reflux from 'reflux';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TweetsStore from '../stores/tweetsStore';
import actions from '../actions/actions';
import s from '../styles/App.css'
import socketIOClient from "socket.io-client";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip'
import {List, ListItem} from 'material-ui/List';
import { Link } from 'react-router';


const socket = socketIOClient('http://localhost:3001');
const realtime = <FontIcon className="material-icons">pie_chart</FontIcon>;
const timeline = <FontIcon className="material-icons">timeline</FontIcon>;
const tweets = <FontIcon  style={{color: '#d17a22'}}className="material-icons">view_stream</FontIcon>;

class TweetsPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.stores = [TweetsStore];
  }
  componentDidMount(){
    socket.on('twit', function (data) {
    actions.doStuff(data);
    });
  }

  render() {

    return (
      <div className='divdiv'>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}
      >
      <AppBar className="App"
      title="Mood Barometer"
      titleStyle={{color: "#fffffff"}}
      iconElementRight={
        <IconButton tooltip="Information">
       <FontIcon className="material-icons" color='#ffffff'>info_outline</FontIcon>
       </IconButton>
      }
      showMenuIconButton={false}
      />


      <Paper className="me">

                 {this.state.tweets.map((tweets) => <Paper zDepth={3} className="tweets"> {tweets.label} tweet  with sentiment score of {tweets.score}  <Divider  style={{
          margin:'5px',
          backgroundColor: '#ffd699',
    }}/> {tweets.text} </Paper>)}

      </Paper>


      <BottomNavigation>
      <BottomNavigationItem
        label="Real-Time"
        icon={realtime}
        onClick={({ title, history }) => this.props.history.push('/')}
      />
      <BottomNavigationItem
        label="Timeline"
        icon={timeline}
          onClick={({ title, history }) => this.props.history.push('/statistics')}
      />
      <BottomNavigationItem
        label="Tweets"
        icon={tweets}
        onClick={({ title, history }) => this.props.history.push('/tweets')}
      />
    </BottomNavigation>
      </MuiThemeProvider>
      </div>
    );
  }
}

export default TweetsPage;
