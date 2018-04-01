import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import MainPage from './components/mainPage';
import StatsPage from './components/statsPage';
import TweetsPage from './components/tweetsPage';
ReactDOM.render((
  <BrowserRouter>
  <Switch>
    <Route exact path="/" component={MainPage}/>
    <Route path="/statistics" component={StatsPage}/>
    <Route path="/tweets" component={TweetsPage}/>
  </Switch>
  </BrowserRouter>
), document.getElementById('root'));
