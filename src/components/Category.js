import React from 'react';
import { PropTypes } from 'prop-types';
import { FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


export class Category extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    editCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    subcategory: PropTypes.bool,
    parentID: PropTypes.string,
    addCategory: PropTypes.func,
    moveTask: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  static defaultProps = {
    addCategory: null,
    subcategory: false,
    parentID: null,
  }

  state = {
    isEditActive: false,
  };

  handleInputChange = ({ target }) => this.setState({ [target.name]: target.value.trim() });

  handleAddSubCategory = () => {
    const { id, addCategory } = this.props;
    const newSubcategoryTitle = prompt('Введите название новой подкатегории');
    if (newSubcategoryTitle === null || newSubcategoryTitle.length === 0) return;
    // если это НЕ подкатегория, то будет передан id - родительская категория
    addCategory(newSubcategoryTitle, id);
  }

  handleEditCategory = () => {
    if (!this.state.newTitle) return;

    const { editCategory, id, parentID } = this.props;

    editCategory(this.state.newTitle, id, parentID);
    this.setState({ isEditActive: false });
  }

  handleDeleteCategory = () => {
    const { deleteCategory, id, parentID } = this.props;

    deleteCategory(id, parentID);
  }

  handleMoveTaskToThisCategory = () => {
    const { moveTask, id, match } = this.props;

    moveTask(id, match.params.taskID);
  }

  redirect = ({ target }) => {
    if (target.id !== 'redirect') return;
    const { history, id } = this.props;
    history.push(`/${id}/all`);
  }

  render() {
    const { id, title, subcategory, match } = this.props;
    const { isEditActive, newTitle } = this.state;

    return (
      <li
        id="redirect"
        onClick={this.redirect}
        className={`single-category-li ${id === match.params.categoryID ? 'categories--active' : null}`}
      >
        {
          isEditActive
            ? (
              <FormControl
                className="add-category-form"
                type="text"
                placeholder={title}
                value={newTitle}
                onChange={this.handleInputChange}
                name="newTitle"
              />
            )
            : <span>{title}</span>}
        <span className="icon-wrapper">
          <span
            tabIndex="0"
            role="button"
            onClick={this.handleDeleteCategory}
          >
            <i className="fas fa-minus-circle" />
          </span>
          {!subcategory && <span onClick={this.handleAddSubCategory}><i className="fas fa-plus-circle" /></span>}
          <span
            tabIndex="0"
            role="button"
            onClick={() => this.setState({ isEditActive: true })}
          >
            <i className="fas fa-pencil-alt" />
          </span>
          {
            match.params.categoryID !== id && match.params.taskID !== 'all' && (
              <span onClick={this.handleMoveTaskToThisCategory}><i className="fas fa-exchange-alt" /></span>
            )
          }
          {
            isEditActive
              ? (
                <span
                  tabIndex="0"
                  role="button"
                  onClick={this.handleEditCategory}
                >
                  <i className="fas fa-check-circle" />
                </span>
              )
              : null
          }
        </span>
      </li>
    );
  }
}

export default withRouter(Category);
