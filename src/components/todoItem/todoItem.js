import React, { Component } from 'react';
import './todoItem.css';

class TodoItem extends Component {
  toggleItem = (index) => {
    this.props.toggleItem(index);
  }

  deleteItem = (index) => {
    this.props.deleteItem(index);
  }

  render() {
    const state = this.props;
    const type = state.type;
    const status = state.todo.status;
    if (type === 'unfinished' && status) {
      return '';
    }
    if (type === 'complete' && !status) {
      return '';
    }
    return (
      <li className="todo">
        <span
          className={['checkbox', state.todo.status ? 'checked' : ''].join(' ')}
          onClick={(e) => this.toggleItem(state.id)}
        ></span>
        <p
          className={state.todo.status ? 'complete' : ''}
        >{state.id + 1}. {state.todo.value}</p>
        <span className="delete" onClick={(e) => this.deleteItem(state.id)}>×</span>
      </li>
    );
  }
}

export default TodoItem;
