import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from 'material-ui/CssBaseline';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Dashboard from './Dashboard';
import CandidateForm from './candidates/CandidateForm';
import CandidateShow from './candidates/CandidateShow';
import ExperienceForm from './candidates/ExperienceForm';

class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="container">
        <CssBaseline />
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/candidate/new" component={CandidateForm} />
              <Route path="/experience/candidate/:_id?" component={ExperienceForm} />
              <Route exact path="/candidate/:_id" component={CandidateShow} />
              <Route path="/" component={Dashboard} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
