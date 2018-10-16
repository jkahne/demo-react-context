import React from 'react';
import './App.css';

class Todo extends React.Component{
  render(){
    const todo = this.props.todo;
    return(
      <div>
        <input
          type="checkbox"
          id={`todo_${todo.id}`}
        />
        <label>{todo.description}</label>
      </div>
    )
  }
}

class Section extends React.Component{
  render(){
    return (
      <div>
        <div>{this.props.section.name}</div>
        <div>
          {this.props.section.todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
            />
          ))}
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    sections: [
      {id: 1, name: 'groceries', todos: [
        {id: 1, description: 'milk'},
        {id: 2, description: 'bread'}
      ]},
      {id: 2, name: 'home', todos: [
        {id: 3, description: 'cut grass'},
        {id: 4, description: 'dishes'},
        {id: 5, description: 'nap'}
      ]},
    ],
  }

  render() {
    return (
      <div className="App">
        {this.state.sections.map(section => (
          <Section
            key={section.id}
            section={section}
          />
        ))}
      </div>
    );
  }
}

export default App;
