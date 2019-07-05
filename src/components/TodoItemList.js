import React, {Component} from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
    render() {
        const { todos, onToggle, onRemove } = this.props;

        const todoList = todos.map(
          ({id, itemTodo, isCompleted}) => (
            <TodoItem
              id={id}
              text={itemTodo}
              checked={isCompleted}
              onToggle={onToggle}
              onRemove={onRemove}
              key={id}
            />
          )
        );

        return (
          <div>
            {todoList}
          </div>
        );
    }
}

export default TodoItemList;