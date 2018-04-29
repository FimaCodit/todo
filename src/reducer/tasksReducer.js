import { createUniqID } from '../helpers';

const initialState = {
  tasks: [
    { id: createUniqID(), title: 'sport_task', isCompleted: false, parentCategoryID: '0' },
    { id: createUniqID(), title: 'work_task', isCompleted: true, parentCategoryID: '1' },
    { id: createUniqID(), title: 'learning_task', isCompleted: false, parentCategoryID: '2' },
  ],
  showOnlyIncompleted: false,
};


const tasks = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: state.tasks.concat({
          title: action.payload.title,
          id: createUniqID(),
          isCompleted: false,
          parentCategoryID: action.payload.categoryID,
        }),
      };
    case 'COMPLETE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(todo => (todo.id === action.payload.id ?
          { ...todo, isCompleted: !todo.isCompleted } :
          todo)),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'EDIT_TASK_TEXT': {
      const { id, title, description } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map(task => (
          task.id === id
            ? { ...task, title, description }
            : task
        )),
      };
    }
    case 'MOVE_TO_CATEGORY': {
      const { categoryID, taskID } = action.payload;

      return {
        ...state,
        tasks: state.tasks.map(task => (
          task.id === taskID
            ? { ...task, parentCategoryID: categoryID }
            : task
        )),
      };
    }
    case 'TOGGLE_SHOW_INCOMPLETED': {
      return {
        ...state,
        showOnlyIncompleted: !state.showOnlyIncompleted,
      };
    }
    default:
      return state;
  }
};

export default tasks;
