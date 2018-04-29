import { connect } from 'react-redux';
import Categories from '../components/Categories';
import { addCategory, editCategory, deleteCategory } from '../actions/CategoriesActions';
import { moveTask } from '../actions/TaskActions';

const mapDispatchToProps = state => ({
  categories: state.categoriesReducer.categories,
});


export default connect(
  mapDispatchToProps,
  { addCategory, editCategory, deleteCategory, moveTask },
)(Categories);
