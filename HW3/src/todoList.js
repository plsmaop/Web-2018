import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListHeader from './listHeader';
import TodoItem from './todoItem';

import strHash from './strHash';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoName: '',
      todos: [],
      changeListMode: false,
      listName: this.props.listContent.name,
    };
    this.addTodo = this.addTodo.bind(this);
    this.changeName = this.changeName.bind(this);
    this.update = this.update.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.finish = this.finish.bind(this);
    this.changeListName = this.changeListName.bind(this);
  }
  addTodo() {
    const { todoName, todos } = this.state;
    this.setState({ todoName: '' });
    if (todoName.trim().length <= 0) return;
    if (todos.length > 18) {
      alert('Too Many Todos!!!');
      return;
    }
    const todo = {
      todoName,
      done: false,
      key: strHash(`${todoName}${todos.length}`),
    };
    this.setState({ todos: todos.concat([todo]) });
    this.props.listContent.update(0, 1);
  }
  removeTodo(key) {
    const { todos } = this.state;
    const updateCount = todos.filter(todo => todo.key === key)[0].done ? -1 : 0;
    this.props.listContent.update(updateCount, -1);
    console.log(updateCount);
    this.setState({ todos: todos.filter(todo => todo.key !== key) });
  }
  update(i) { this.props.listContent.update(i, 0); }
  finish(key) {
    const { todos } = this.state;
    for (let i = 0; i < todos.length; i += 1) {
      if (todos[i].key === key) todos[i].done = !todos[i].done;
    }
    this.setState({ todos });
  }
  changeName(todoName) { this.setState({ todoName }); }
  changeListName(newName, change) {
    const { changeListMode } = this.state;
    if (changeListMode && !change) this.setState({ listName: newName });
    else if (change) this.setState({ changeListMode: !changeListMode });
  }
  render() {
    const headerContent = this.props.listContent;
    const { todos, changeListMode, listName } = this.state;

    headerContent.name = listName;
    headerContent.addTodo = this.addTodo;
    headerContent.changeName = this.changeName;
    headerContent.todoName = this.state.todoName;
    headerContent.todos = this.state.todos;
    headerContent.done = todos.filter(todo => todo.done).length;
    headerContent.changeListMode = changeListMode;
    headerContent.changeList = this.changeListName;

    const { update, removeTodo, finish } = this;
    const newArray = [];
    for (let i = 0; i < todos.length; i += 1) {
      const { todoName, key } = todos[i];
      newArray.push(<TodoItem
        name={todoName}
        key={key}
        update={update}
        remove={removeTodo}
        id={key}
        finish={finish}
      />);
    }
    for (let i = todos.length; i < 18; i += 1) {
      const key = strHash(`${i}`);
      newArray[i] = (<TodoItem
        name=''
        key={key}
        update={update}
        remove={removeTodo}
        id={key}
        finish={finish}
      />);
    }
    return (
      <div className='list'>
        <ListHeader headerContent={headerContent} />
        <div className='content'>
          { newArray }
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
};

TodoList.propTypes = {
  listContent: PropTypes.shape(todoListShape).isRequired,
};

export default TodoList;
