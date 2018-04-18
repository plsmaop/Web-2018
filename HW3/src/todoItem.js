import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    const {
      update, remove, finish, id,
    } = this.props;
    if (e.target.classList[0] === 'todo') {
      finish(id);
      if (e.target.classList.contains('done')) {
        e.target.classList.remove('done');
        update(-1);
      }
      else {
        e.target.classList.add('done');
        update(1);
      } 
    }
    else if (e.target.classList[0] === 'delete') { remove(id); }
  }
  handleHover(e) {
    if (e.type === 'mouseover') e.target.classList.add('hovered');
    else if (e.type === 'mouseleave') e.target.classList.remove('hovered');
  }
  render() {
    const { handleClick, handleHover } = this;
    const { name } = this.props;
    return (
      <div>
        <div
          role='button'
          tabIndex={0}
          className='todo'
          onClick={handleClick}
          onMouseOver={handleHover}
          onMouseLeave={handleHover}
        >
          {name}
        </div>
        <div
          role='button'
          tabIndex={0}
          className='delete'
          onClick={handleClick}
        >
          {name === '' ? '' : 'X'}
        </div>
      </div>
    );
  }
}

TodoItem.propTypes = {
  name: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  finish: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default TodoItem;
