const React = require('react');
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
const App = require('./app');
const Login = require('./login.jsx');
const ResidentPane = require('./ResidentPane.jsx');
const ResidentHome = require('./ResidentHome.jsx');
const ResidentResults = require('./ResidentResults.jsx');
const ResidentChangePW = require('./ResidentChangePW.jsx');
const DirectorPane = require('./DirectorPane.jsx');
const DirectorHome = require('./DirectorHome.jsx');
const DirectorResults = require('./DirectorResults.jsx');
const DirectorSettings = require('./DirectorSettings.jsx');
const TodaysQuiz = require('./DirectorTodaysQuiz.jsx');
const Quiz = require('./Quiz/Quiz.jsx');
import { isDirector, isResident, goHome } from './auth';


const Routes = React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={App}>

          <IndexRoute component={Login} onEnter={goHome} />

          <Route component={ResidentPane}>
            <Route path='resident' onEnter={isResident} >
              <IndexRoute component={ResidentHome} />
              <Route path='quiz' component={Quiz} />
              <Route path='results' component={ResidentResults} />
              <Route path='changePassword' component={ResidentChangePW} />
            </Route>
          </Route>

          <Route component={DirectorPane}>
            <Route path='director' onEnter={isDirector} >
              <IndexRoute component={DirectorHome} />
              <Route path='todaysQuiz' component={TodaysQuiz} />
              <Route path='results' component={DirectorResults} />
              <Route path='settings' component={DirectorSettings} />
            </Route>
          </Route>

        </Route>
      </Router>
    );
  },
});

module.exports = Routes;
