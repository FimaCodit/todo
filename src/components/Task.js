import React from 'react';
import { PropTypes } from 'prop-types';
import { Checkbox, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

export class Task extends React.PureComponent {
  static propTypes = {
    isCompleted: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    completeTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.string.isRequired,
    editTask: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  state = {
    newTaskTitle: '',
    newTaskDescription: '',
  }

  handleToggleTaskState = () => this.props.completeTask(this.props.id);

  handleTaskDelete = () => this.props.deleteTask(this.props.id);

  handleTaskEdit = () => {
    const { editTask, id } = this.props;
    const { newTaskTitle, newTaskDescription } = this.state;

    editTask(id, newTaskTitle, newTaskDescription);
    this.setState({ newTaskTitle: '', newTaskDescription: '', isEditActive: false });
  }

  handleInputChange = event => this.setState({ newTaskTitle: event.target.value.trim() });
  handleTextareaChange = event => this.setState({ newTaskDescription: event.target.value.trim() });

  redirect = ({ target }) => {
    if (target.id !== 'redirect') return;

    const { history, id, match } = this.props;
    const { categoryID } = match.params;

    history.push(`/${categoryID}/${id}`);
  }

  render() {
    const { title, isCompleted, match, id } = this.props;
    const { isEditActive, newTaskTitle, newTaskDescription } = this.state;

    return (
      <li className={match.params.taskID === id ? 'task-active' : ''} id="redirect" onClick={this.redirect}>
        <div className="flex" id="redirect">
          <Checkbox onClick={this.handleToggleTaskState} checked={isCompleted} className="checkbox-task" inline />
          {isEditActive
            ? (
              <FormControl
                className="add-category-form"
                type="text"
                placeholder={title}
                value={newTaskTitle}
                onChange={this.handleInputChange}
                name="newTitle"
              />
            )
            : <span style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>{title}</span>}
          <div className="edit-task">
            <span onClick={this.handleTaskDelete}><i className="fas fa-minus-circle edit-task" /></span>
            {!isEditActive && (
              <span onClick={() => this.setState({ isEditActive: true })}>
                <i className="fas fa-pencil-alt edit-task" />
              </span>
            )}
            {
              isEditActive ? (
                <span
                  tabIndex="0"
                  role="button"
                  onClick={this.handleTaskEdit}
                >
                  <i className="fas fa-check-circle" />
                </span>) : null }
          </div>
        </div>
        {
          isEditActive ? (
            <React.Fragment>
              <h5>Description</h5>
              <textarea value={newTaskDescription} onChange={this.handleTextareaChange} />
            </React.Fragment>
          ) : null }
      </li>
    );
  }
}

export default withRouter(Task);
