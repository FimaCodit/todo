import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Checkbox, FormControl } from 'react-bootstrap';
import { toggleShowIncomleted } from '../actions/TaskActions';

export class Header extends React.Component {
  static propTypes = {
    showOnlyIncompleted: PropTypes.bool.isRequired,
    toggleCheckbox: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  state = {
    searchValue: this.props.match.params.searchText || '',
  }

  handleChangeSearchFilter = ({ target }) => {
    const { history, match } = this.props;
    const { categoryID, taskID } = match.params;

    this.setState({ searchValue: target.value }, history.push(`/${categoryID}/${taskID}/${target.value}`));
  }

  render() {
    const { showOnlyIncompleted, toggleCheckbox } = this.props;
    const { searchValue } = this.state;

    return (
      <header>
        <div className="header-title">To-Do List</div>
        <div className="header-right">
          <span className="header-checkbox">
            <Checkbox checked={!showOnlyIncompleted} onChange={toggleCheckbox} inline>Show done</Checkbox>
          </span>
          <span className="header-form">
            <FormControl
              value={searchValue}
              onChange={this.handleChangeSearchFilter}
              style={{ width: '60%' }}
              type="text"
              placeholder="Search"
            />
          </span>
          <button className="btn-clearSearch" onClick={() => this.setState({ searchValue: '' })}>&times;</button>
        </div>
      </header>
    );
  }
}

export default withRouter(connect(
  state => ({ showOnlyIncompleted: state.tasksReducer.showOnlyIncompleted }),
  { toggleCheckbox: toggleShowIncomleted },
)(Header));
