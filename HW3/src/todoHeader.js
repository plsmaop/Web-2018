import React, { Component } from 'react';
import PropTypes from 'prop-types';

import isTooLong from './isTooLoog';

class TodoHeader extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (isTooLong(this.props.listName, 19)) {
      alert('The length of the Name TodoList is not allowed to exceed 19 char');
      return;
    }
    this.props.addList();
    this.props.changeName('');
  }
  handleKeyPress(e) {
    if (e.key !== 'Enter') return;
    if (isTooLong(this.props.listName, 19)) {
      alert('The length of the Name TodoList is not allowed to exceed 19 char');
      return;
    }
    this.props.addList();
    this.props.changeName('');
  }
  handleChange(e) { this.props.changeName(e.target.value); }
  render() {
    const { handleClick, handleKeyPress, handleChange } = this;
    const { listName, done, all } = this.props;
    const doneTodo = done;
    const undoneTodo = all - done;
    return (
      <div>
        <h1>Todo List</h1>
        <div>
          <span id='done'>{`已完成: ${doneTodo}`}</span>
          <span id='undone'>{`未完成: ${undoneTodo}`}</span>
          <div className='input'>
            <input
              type='text'
              onKeyPress={handleKeyPress}
              onChange={handleChange}
              className='input'
              value={listName}
            />
            <input
              type='button'
              name='addList'
              onClick={handleClick}
              value='+'
              className='submit'
            />
          </div>
        </div>
      </div>
    );
  }
}

TodoHeader.propTypes = {
  listName: PropTypes.string.isRequired,
  addList: PropTypes.func.isRequired,
  changeName: PropTypes.func.isRequired,
  done: PropTypes.number.isRequired,
  all: PropTypes.number.isRequired,
};

export default TodoHeader;
