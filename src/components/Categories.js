import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, FormControl } from 'react-bootstrap';
import Category from './Category';

export default class Categories extends React.Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subcategories: PropTypes.array,
    })),
    addCategory: PropTypes.func.isRequired,
    editCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    moveTask: PropTypes.func.isRequired,
  }

  static defaultProps = {
    categories: [],
  }

  state = {
    newCategoryTitle: '',
  }

  createCategory = () => {
    this.props.addCategory(this.state.newCategoryTitle);
    this.setState({ newCategoryTitle: '' });
  }

  handleInputChange = event => this.setState({ newCategoryTitle: event.target.value.trim() });

  render() {
    const { categories, editCategory, deleteCategory, addCategory, moveTask } = this.props;
    return (
      <div className="categories">
        <div className="add-new-category">
          <div className="add-category">
            <FormControl
              className="add-category-form"
              type="text"
              placeholder="Enter category title"
              value={this.state.newCategoryTitle}
              onChange={this.handleInputChange}
            />
            <Button disabled={!this.state.newCategoryTitle} bsStyle="primary" onClick={() => this.createCategory('test')}>
             ADD
            </Button>
          </div>
          <div className="category-tree">
            <ul>
              {
                categories.map(({ id, title, subcategories }) => (
                  <React.Fragment key={id}>
                    <Category
                      addCategory={addCategory}
                      editCategory={editCategory}
                      deleteCategory={deleteCategory}
                      key={id}
                      id={id}
                      title={title}
                      moveTask={moveTask}
                    />
                    <ul>
                      {subcategories.map(subcategory => (
                        <Category
                          subcategory
                          parentID={id}
                          editCategory={editCategory}
                          deleteCategory={deleteCategory}
                          key={subcategory.id}
                          id={subcategory.id}
                          title={subcategory.title}
                          moveTask={moveTask}
                        />
                      ))}
                    </ul>
                  </React.Fragment>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
