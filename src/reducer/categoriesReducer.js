import { createUniqID } from '../helpers';

const initialState = {
  categories: [
    {
      id: 'all',
      title: 'Все',
      subcategories: [],
    },
    {
      id: '0',
      title: 'sport',
      subcategories: [{ id: createUniqID(), title: 'sport_sub' }, { id: createUniqID(), title: 'sport_sub2' }],
    },
    {
      id: '1',
      title: 'work',
      subcategories: [{ id: createUniqID(), title: 'work_sub' }, { id: createUniqID(), title: 'work_sub2' }],
    },
    {
      id: '2',
      title: 'learning',
      subcategories: [{ id: createUniqID(), title: 'learning_sub' }, { id: createUniqID(), title: 'learning_sub2' }],
    },
  ],
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY': {
      const { parentID, title } = action.payload;

      // добавление категори
      if (!parentID) {
        return {
          ...state,
          categories: state.categories.concat({
            title,
            id: createUniqID(),
            subcategories: [],
          }),
        };
      }

      return {
        ...state,
        categories: state.categories
          .slice()
          .map(category =>
            (category.id === parentID
              ? { ...category, subcategories: category.subcategories.concat({ id: createUniqID(), title }) }
              : category)),
      };
    }

    case 'DELETE_CATEGORY': {
      const { id, parentID } = action.payload;

      if (!parentID) {
        return {
          ...state,
          categories: state.categories.filter(category => category.id !== id),
        };
      }

      return {
        ...state,
        categories: state.categories
          .slice()
          .map(category => (parentID === category.id
            ? { ...category, subcategories: category.subcategories.filter(subcategory => subcategory.id !== id) }
            : category)),
      };
    }
    case 'EDIT_CATEGORY': {
      const { payload } = action;
      const { parentID, id: requiredID } = payload;

      // если нет parentID - это категория
      if (!parentID) {
        return {
          ...state,
          categories: state.categories
            .slice()
            .map(category =>
              (requiredID === category.id ? { ...category, title: payload.title } : category)),
        };
      }

      // если есть parenID - это подкатегория и нужно найти ее внутри категорий
      const newCategories = state.categories
        .slice()
        .map(category => ({
          ...category,
          subcategories: category.subcategories.map(subcategory =>
            (requiredID === subcategory.id
              ? { ...subcategory, title: payload.title }
              : subcategory)),
        }));

      return {
        ...state,
        categories: newCategories,
      };
    }
    default:
      return state;
  }
};

export default categories;
