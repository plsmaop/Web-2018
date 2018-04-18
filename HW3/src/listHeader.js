import React, { Component } from 'react';
import PropTypes from 'prop-types';

import isTooLong from './isTooLoog';

class ListHeader extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleClick(e) {
    const {
      addTodo, changeName, update, done, todos, id, removeList, changeList,
    } = this.props.headerContent;
    if (e.target.tagName === 'INPUT') {
      addTodo();
      changeName('');
    }
    else if (e.target.tagName === 'DIV') {
      removeList(id);
      update(-done, -todos.length);
    }
    else if (e.target.tagName === 'H2') { changeList('', true); }
  }
  handleChange(e) {
    const { changeName, changeList } = this.props.headerContent;
    if (e.target.id === 'changeList') changeList(e.target.value, false);
    else changeName(e.target.value);
  }
  handleKeyPress(e) {
    const {
      addTodo, changeName, todoName, name, changeList,
    } = this.props.headerContent;
    if (e.key !== 'Enter') return;
    if (e.target.id === 'changeList') {
      if (name.length <= 0) {
        alert('Empty List Name is Not ALLOWED!!!');
        return;
      }
      if (isTooLong(name.trim(), 19)) {
        alert('The length of the Name TodoList is not allowed to exceed 19 char');
        return;
      }
      changeList('', true);
      return;
    }
    if (isTooLong(todoName, 25)) {
      alert('The length of the Name TodoList is not allowed to exceed 25 char');
      return;
    }
    addTodo();
    changeName('');
  }
  render() {
    const {
      name, todoName, todos, done, changeListMode,
    } = this.props.headerContent;
    const { handleClick, handleChange, handleKeyPress } = this;
    const undone = todos.length - done;
    const header = (
      <h2
        role='button'
        tabIndex={0}
        className='header'
        onClick={handleClick}
      >{name}
      </h2>
    );
    const changeList = (
      <input
        id='changeList'
        className='header changeHeader'
        type='text'
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        value={name}
      />
    );
    return (
      <div>
        { changeListMode ? changeList : header}
        <div
          role='button'
          tabIndex={0}
          className='delete'
          onClick={handleClick}
        >X
        </div>
        <div>{`未完成: ${undone}`}</div>
        <div>
          <input
            type='text'
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            value={todoName}
          />
          <input
            type='button'
            onClick={handleClick}
            value='+'
          />
        </div>
      </div>
    );
  }
}

const todoListShape = {
  name: PropTypes.string,
  id: PropTypes.number,
  removeList: PropTypes.func,
  update: PropTypes.func,
  addTodo: PropTypes.func,
  changeName: PropTypes.func,
  todoName: PropTypes.string,
  todos: PropTypes.array,
  done: PropTypes.number,
  changeListMode: PropTypes.bool,
  changeList: PropTypes.func,
};

ListHeader.propTypes = {
  headerContent: PropTypes.shape(todoListShape).isRequired,
};

export default ListHeader;
