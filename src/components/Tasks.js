import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Task from './Task';


export class Tasks extends React.Component {
  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    })),
    addTask: PropTypes.func.isRequired,
    completeTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    showOnlyIncompleted: PropTypes.bool.isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  static defaultProps = {
    tasks: [],
  }

  state = {
    newTaskTitle: '',
  }

  createTask = () => {
    const { addTask, match } = this.props;
    addTask(this.state.newTaskTitle, match.params.categoryID);

    this.setState({ newTaskTitle: '' });
  }


  handleInputChange = event => this.setState({ newTaskTitle: event.target.value.trim() });

  render() {
    const { tasks, completeTask, deleteTask, editTask, match, showOnlyIncompleted } = this.props;
    const { categoryID } = match.params;

    const tasksToRender = showOnlyIncompleted ? tasks.filter(task => !task.isCompleted) : tasks;

    return (
      <div className="tasks">
        <div className="add-new-task">
          <FormControl
            className="add-new-task-form"
            type="text"
            placeholder="Enter new task"
            value={this.state.newTaskTitle}
            onChange={this.handleInputChange}
          />
          <Button disabled={!this.state.newTaskTitle} bsStyle="primary" onClick={this.createTask}>ADD</Button>
        </div>
        <div className="task-list">
          <ul>
            {
             tasksToRender.filter(task => categoryID === 'all' || task.parentCategoryID === categoryID)
              .map(({ id, title, isCompleted }) => (
                <Task
                  key={id}
                  id={id}
                  title={title}
                  completeTask={completeTask}
                  isCompleted={isCompleted}
                  deleteTask={deleteTask}
                  editTask={editTask}
                />
              ))
              }
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(Tasks);
