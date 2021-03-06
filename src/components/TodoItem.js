import React, { Component } from 'react';
import './TodoItem.css'

class TodoItem extends Component {
    render() {
        const { text, checked, id, onToggle, onRemove } = this.props;

        return (
            <div className="todo-item" onClick={() => onToggle(id, checked)}>
                {
                    checked && (<div className="check-mark">✓</div>)
                }
                <div className={`todo-text ${checked && 'checked'}`}>
                    <div>{text}</div>
                </div>
                <div className="remove" onClick={(e) => {
                    e.stopPropagation();    // Blocking onToggle run
                    onRemove(id)}
                }>&times;</div>
            </div>
        )
    }
}

export default TodoItem;