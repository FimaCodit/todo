import { createAction } from 'redux-actions';

export const addCategory = createAction(
  'ADD_CATEGORY',
  (title, parentID) => ({ title, parentID }),
);

export const editCategory = createAction(
  'EDIT_CATEGORY',
  (title, id, parentID) => ({ title, id, parentID }),
);

export const deleteCategory = createAction(
  'DELETE_CATEGORY',
  (id, parentID) => ({ id, parentID }),
);

export default addCategory;
