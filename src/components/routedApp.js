import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import '../css/main.css';
import Header from './Header';
import CategoriesContainer from '../container/CategoriesContainer';
import TasksContainer from '../container/TasksContainer';

export const RoutedApp = ({ tasks }) => (
  <React.Fragment>
    {/* redirect to /all/all from root URL */}
    <Route
      exact
      path="/" // localhost:3000
      render={({ match }) => (
        <React.Fragment>
          <Route
            exact
            path={`${match.path}:singleParameter`}
            render={() => <Redirect to={`${match.path}all/all`} />}
          />
          <Redirect to={`${match.path}all/all`} />
        </React.Fragment>
      )}
    />

    {/* redirect to /all/all from URL with single parameter (we need 2 at least) */}
    <Route
      exact
      path="/:singleParameter" // localhost:3000
      render={() => (
        <Redirect to="/all/all" />
      )}
    />

    {/* render our App when URL has 2 parameters - categoryID and takID */}
    <Route
      path="/:categoryID/:taskID"
      component={props => (
        <div className="wrapper">
          <Header {...props} />
          <ProgressBar now={(tasks.filter(task => task.isCompleted).length / tasks.length) * 100} />;
            <div className="content-wrapper">
              <CategoriesContainer {...props} />
              <TasksContainer {...props} />
            </div>
        </div>
      )}
    />
  </React.Fragment>
);

RoutedApp.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  })).isRequired,
};

export default withRouter(connect(state => ({ tasks: state.tasksReducer.tasks }))(RoutedApp));
