import React, { Component } from 'react';
import TodoItem from './components/todoItem/todoItem';
import './style/app.css';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addTodoValue: '',
      type: 'all',
      list: []
    };
  }

  componentDidMount() {
    let list = JSON.parse(localStorage.getItem('todo-list')) || [];
    this.setState({ list });
  }

  addTodo = (event) => {
    this.setState({ addTodoValue: event.target.value });
  }

  inputKeyCpde = (event) => {
    const keyCode = event.keyCode;
    const value = event.target.value;
    if (keyCode === 13) {
      let { list } = this.state;
      list.push({
        status: false,
        value
      });
      this.setState({
        addTodoValue: '',
        list
      });
      localStorage.setItem('todo-list', JSON.stringify(list));
    }
  }

  changeType = (type) => {
    this.setState({ type });
  }

  clearAll = () => {
    let { list } = this.state;
    list = list.filter(v => !v.status);
    this.setState({ list });
    localStorage.setItem('todo-list', JSON.stringify(list));
  }

  toggleItem = (index) => {
    let { list } = this.state;
    list[index].status = !list[index].status;
    this.setState({ list });
    localStorage.setItem('todo-list', JSON.stringify(list));
  }

  deleteItem = (index) => {
    let { list } = this.state;
    list.splice(index, 1);
    this.setState({ list });
    localStorage.setItem('todo-list', JSON.stringify(list));
  }

  render() {
    const state = this.state;
    return (
      <div className="container">
        <header>Todos</header>
        <div>
          <input
            className="new-todo"
            type="text"
            placeholder="请输入待办事项"
            value={state.addTodoValue}
            onChange={this.addTodo}
            onKeyDown={this.inputKeyCpde}
          />
        </div>
        <section>
          <span className="wait">{state.list.filter(v => !v.status).length}项未完成</span>
          <span
            className={state.type === 'all' ? 'on' : ''}
            onClick={(e) => this.changeType('all')}
          >全部</span>
          <span
            className={state.type === 'unfinished' ? 'on' : ''}
            onClick={(e) => this.changeType('unfinished')}
          >未完成</span>
          <span
            className={state.type === 'complete' ? 'on' : ''}
            onClick={(e) => this.changeType('complete')}
          >已完成</span>
          <span className="clear" onClick={this.clearAll}>清除已完成</span>
        </section>
        <div>
          <ul className="todo-list">
            {state.list.map((item, index) =>
              <TodoItem
                todo={item}
                key={index}
                id={index}
                type={state.type}
                toggleItem={this.toggleItem}
                deleteItem={this.deleteItem}
              />
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Todo;
