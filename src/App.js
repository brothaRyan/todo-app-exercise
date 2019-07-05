import React, {Component} from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form'
import TodoItemList from './components/TodoItemList';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = BACKEND_URL + "todos/";

class App extends Component {

  state = {
    input: '',
    todos: [
    ]
  }

  async componentDidMount() {
    await axios.get(API_URL).then(res => {
      const todos = res.data;
      this.setState({
        input: '',
        todos: todos
      })
    }).catch(err => console.log(err));
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  handleCreate = () => {
    const { input } = this.state;
    axios.post(API_URL, {text: input}).then(res => {
      const todos = res.data;
      this.setState({
        input: '',
        todos: todos
      })
    }).catch(err => console.log(err));
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id, checked) => {
    axios.put(API_URL+id, {isCompleted: !checked}).then(res => {
      const todos = res.data;
      this.setState({
        input: '',
        todos: todos
      })
    }).catch(err => console.log(err));
  }
  handleRemove = (id) => {
    axios.delete(API_URL+id, {crossorigin:true}).then(res => {
      const todos = res.data;
      this.setState({
        input: '',
        todos: todos
      })
    }).catch(err => console.log(err));
  }

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle
    } = this;

    return (
      <TodoListTemplate form={(
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={this.handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;