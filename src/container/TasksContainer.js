import { connect } from 'react-redux';
import Tasks from '../components/Tasks';
import { addTask, completeTask, deleteTask, editTask } from '../actions/TaskActions';

const mapDispatchToProps = state => ({
  tasks: state.tasksReducer.tasks,
  showOnlyIncompleted: state.tasksReducer.showOnlyIncompleted,
});

export default connect(
  mapDispatchToProps,
  { addTask, completeTask, deleteTask, editTask },
)(Tasks);
