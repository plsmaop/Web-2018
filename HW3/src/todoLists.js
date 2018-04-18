import React from 'react';
import PropTypes from 'prop-types';

import TodoList from './todoList';

const TodoLists = ({ lists }) => (
  <div className='lists'>
    { lists.map(list => <TodoList listContent={list} key={list.id} />) }
  </div>
);

TodoLists.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoLists;
