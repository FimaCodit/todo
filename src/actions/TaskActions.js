import { createAction } from 'redux-actions';

export const addTask = createAction(
  'ADD_TASK',
  (title, categoryID) => ({ title, categoryID }),
);

export const completeTask = createAction(
  'COMPLETE_TASK',
  (id, isCompleted) => ({ id, isCompleted }),
);

export const deleteTask = createAction(
  'DELETE_TASK',
  id => (id),
);

export const editTask = createAction(
  'EDIT_TASK_TEXT',
  (id, title, description = '') => ({ id, title, description }),
);

export const moveTask = createAction(
  'MOVE_TO_CATEGORY',
  (categoryID, taskID) => ({ categoryID, taskID }),

  // function example(categoryID, taskID) {
  //   return {
  //     categoryID: categoryID,
  //     taskID: taskID,
  //   }
  // }
);

export const toggleShowIncomleted = createAction(
  'TOGGLE_SHOW_INCOMPLETED',
  () => ({}),
);

export default addTask;
