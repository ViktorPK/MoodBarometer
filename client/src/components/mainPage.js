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
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip'
import {blue300} from 'material-ui/styles/colors';
import {VictoryPie} from 'victory';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const socket = socketIOClient('http://localhost:3001');
const recentsIcon = <FontIcon className="material-icons">pie_chart</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">timeline</FontIcon>;

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

      <AppBar className="App"
      title="Mood Barometer"
      iconElementRight={
        <IconButton tooltip="Information">
       <FontIcon className="material-icons">info_outline</FontIcon>
       </IconButton>
      }
      showMenuIconButton={false}
      />
      <div className='rowC'>
      <div className='rdiv'>
      <div>
 <VictoryPie
 animate={{duration: 500}}
 padding={{top: 20, bottom: 10 }}
 height={300}
 innerRadius={50}
 style={{ labels: { fill: "white", fontSize: 0 } }}
data={[
{ x: "", y: this.state.positive },
{ x: "", y: this.state.neutral },
{ x: "", y: this.state.negative }
]}
/>
</div>
<div className='rowC'>
<div className='first'/>
<Chip backgroundColor={blue300}
>
Positive
</Chip>
<div className='between'/>
<Chip backgroundColor={blue300}
>
Negative
</Chip>
<div className='between'/>
<Chip backgroundColor={blue300}
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
      <TableHeaderColumn>Type</TableHeaderColumn>
      <TableHeaderColumn>Count</TableHeaderColumn>
      <TableHeaderColumn>Percentage</TableHeaderColumn>S
      <TableHeaderColumn>Average Sentiment</TableHeaderColumn>
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

  <BottomNavigation selectedIndex={this.state.selectedIndex}>
    <BottomNavigationItem
      label="Real-Time"
      icon={recentsIcon}
      onClick={() => this.select(0)}
    />
    <BottomNavigationItem
      label="Timeline"
      icon={favoritesIcon}
      onClick={() => this.select(1)}
    />
  </BottomNavigation>
      </MuiThemeProvider>
    );
  }
}

export default MainPage;
