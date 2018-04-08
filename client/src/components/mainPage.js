import React from 'react';
import Reflux from 'reflux';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MainStore from '../stores/mainStore';
import actions from '../actions/actions';
import s from '../styles/App.css'
import socketIOClient from "socket.io-client";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import Dialog from 'material-ui/Dialog'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import {VictoryPie} from 'victory';
import { Redirect } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const socket = socketIOClient('http://localhost:3001');
const realtime = <FontIcon style={{color: '#d17a22'}} className="material-icons">pie_chart</FontIcon>;
const timeline = <FontIcon className="material-icons">timeline</FontIcon>;
const tweets = <FontIcon className="material-icons">view_stream</FontIcon>;

class MainPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.stores = [MainStore];
  }

  componentDidMount(){
    actions.onStart();
    socket.on('tweet', function (data) {
    actions.gotTweet(data);
});
  }
  render() {
    const ekshans = <FlatButton
            label="OK"
            keyboardFocused={true}
             onClick={() => actions.handleClose()}
          />
    return (
      <div className='divdiv'>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <AppBar className="App"
      title="Mood Barometer"
      titleStyle={{color: "#fffffff"}}
      iconElementRight={
        <IconButton tooltip="Information" onClick={() => actions.handleOpen()}>
       <FontIcon className="material-icons" color='#ffffff'>info_outline</FontIcon>
       </IconButton>
      }
      showMenuIconButton={false}
      />

      <Dialog
       actions={ekshans}
       title="Information"
       modal={false}
       open={this.state.open}
       onRequestClose={() => actions.handleClose()}
     >
       INFORMATION
     </Dialog>


      <div className='rowC'>
      <div className='rdiv'>
      <div>
 <VictoryPie
 animate={{duration: 500}}
colorScale={["#70161e", "#596f62", "#d17a22" ]}
 padding={{top: 20, bottom: 10 }}
 height={290}
 innerRadius={50}
 style={{ labels: { fill: "white", fontSize: 0 } }}
data={[
{ x: "", y: this.state.negative },
{ x: "", y: this.state.neutral },
{ x: "", y: this.state.positive }
]}
/>
</div>
<div className='rowChips'>
<Chip backgroundColor='#d17a22'
>
Positive
</Chip>
<Chip backgroundColor='#70161e'
>
Negative
</Chip>
<Chip backgroundColor='#596f62'
>
Neutral
</Chip>
</div>
</div>


<Paper className="paper"
zDepth={2}
>
<div className="headings">
Tweets: {this.state.count}
</div>
<Divider />

<Table>
<TableHeader adjustForCheckbox={false}
displaySelectAll={false}>
    <TableRow>
      <TableHeaderColumn className="tHeader">Type</TableHeaderColumn>
      <TableHeaderColumn className="tHeader">Count</TableHeaderColumn>
      <TableHeaderColumn className="tHeader">Percentage</TableHeaderColumn>S
      <TableHeaderColumn className="tHeader">Average Sentiment</TableHeaderColumn>
    </TableRow>
  </TableHeader>
  <TableBody displayRowCheckbox={false}>
    <TableRow>
      <TableRowColumn>Positive</TableRowColumn>
      <TableRowColumn>{this.state.positive}</TableRowColumn>
      <TableRowColumn>{this.state.pPercent}%</TableRowColumn>
      <TableRowColumn>{this.state.pSent}</TableRowColumn>
    </TableRow>
    <TableRow>
      <TableRowColumn>Negative</TableRowColumn>
      <TableRowColumn>{this.state.negative}</TableRowColumn>
      <TableRowColumn>{this.state.nPercent}%</TableRowColumn>
      <TableRowColumn>{this.state.nSent}</TableRowColumn>
    </TableRow>
    <TableRow>
      <TableRowColumn>Neutral</TableRowColumn>
      <TableRowColumn>{this.state.neutral}</TableRowColumn>
      <TableRowColumn>{this.state.cPercent}%</TableRowColumn>
      <TableRowColumn>0</TableRowColumn>
    </TableRow>
  </TableBody>
</Table>
<Divider className="divi"/>
<div className='headings'>
Analysis summary
</div>
<div className='analysis'>
Lorem ipsum dolor sit amet, volumus molestie tincidunt at his. Ea possit tamquam menandri per. Ex luptatum volutpat liberavisse pri. At semper recusabo sed, vix ei mucius percipit. Ut vis mundi epicuri suavitate.
</div>
</Paper>
</div>

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

export default MainPage;
