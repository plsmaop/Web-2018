import React, { Component } from 'react';

import TodoHeader from './todoHeader';
import TodoLists from './todoLists';
import strHash from './strHash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: '',
      lists: [],
      numberOfList: 0,
      done: 0,
      all: 0,
    };
    this.addList = this.addList.bind(this);
    this.changeName = this.changeName.bind(this);
    this.removeList = this.removeList.bind(this);
    this.update = this.update.bind(this);
  }
  addList() {
    const { listName, numberOfList } = this.state;
    if (listName.trim().length <= 0) return;
    const list = {
      name: listName,
      id: strHash(`${listName}${numberOfList}`),
      removeList: this.removeList,
      update: this.update,
    };
    this.setState({ numberOfList: numberOfList + 1 });
    this.setState({ lists: this.state.lists.concat([list]) });
  }
  removeList(id) { this.setState({ lists: this.state.lists.filter(list => list.id !== id) }); }
  changeName(listName) { this.setState({ listName }); }
  update(done, all) {
    this.setState({
      done: this.state.done + done,
      all: this.state.all + all,
    });
  }
  render() {
    const {
      lists, listName, done, all,
    } = this.state;
    const { addList, changeName, update } = this;
    return (
      <div className='center'>
        <TodoHeader
          addList={addList}
          changeName={changeName}
          listName={listName}
          done={done}
          all={all}
        />
        <TodoLists lists={lists} update={update} />
      </div>
    );
  }
}

export default App;
