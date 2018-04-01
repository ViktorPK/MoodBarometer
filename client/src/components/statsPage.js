import React from 'react';
import Reflux from 'reflux';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import StatsStore from '../stores/statsStore';
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
import {VictoryLine, VictoryChart, VictoryAxis, VictoryLabel,VictoryBar,VictoryTooltip,VictoryTheme} from 'victory';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const realtime = <FontIcon className="material-icons">pie_chart</FontIcon>;
const timeline = <FontIcon style={{color: '#d17a22'}} className="material-icons">timeline</FontIcon>;
const tweets = <FontIcon className="material-icons">view_stream</FontIcon>;

class StatsPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.stores = [StatsStore];
  }
  componentDidMount(){
    actions.getStats();
  }
  render() {

    return (
      <div className='divdiv'>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
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
      <div className='rowC'>
      <div className='rdiv'>
      <div className="line">
      <VictoryChart
      domain={{x: this.state.current, y: [-1, 1]}}
      >
        <VictoryLine
          style={{
            data: { stroke: "#d17a22" },
            parent: { border: "1px solid #ccc"},
          }}
          animate={{
  duration: 2000,
  onLoad: { duration: 1000 }
  }}
          data={this.state.weeks}
          x={0}
          y={2}
        />
        <VictoryAxis
          label="Week"
          style={{
            axisLabel: { padding: 120 }
          }}
        />
        <VictoryAxis dependentAxis
        label="Average Sentiment"
        style={{
          axisLabel: { padding: 50 }
        }}
        />
      </VictoryChart>
    </div>
    </div>


    <Paper className="paperStats"
    zDepth={2}
    >

    <Table className="table"
    height={450}>
    <TableHeader adjustForCheckbox={false}
    displaySelectAll={false}>
    <TableRow>
      <TableHeaderColumn className="tHeader">Week</TableHeaderColumn>
      <TableHeaderColumn className="tHeader">Average <br></br> Sentiment</TableHeaderColumn>
      <TableHeaderColumn className="tHeader">Number of <br></br> Tweets</TableHeaderColumn>
    </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
    {this.state.weeks.map( (row, index) => (
                  <TableRow key={index}>
                    <TableRowColumn>{row[0]}</TableRowColumn>
                    <TableRowColumn>{row[2].toFixed(7)}</TableRowColumn>
                    <TableRowColumn>{row[1]}</TableRowColumn>
                  </TableRow>
                      ))}
    </TableBody>
    </Table>
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

export default StatsPage;
