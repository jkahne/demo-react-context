import React from 'react';
import './App.css';

export const MyContext = React.createContext()

export class MyProvider extends React.Component{
  state = {
    activeTodo: null,
    sections: [
      {id: 1, name: 'groceries', todos: [
        {id: 1, description: 'milk', checked: false},
        {id: 2, description: 'bread', checked: false}
      ]},
      {id: 2, name: 'home', todos: [
        {id: 3, description: 'cut grass', checked: false},
        {id: 4, description: 'dishes', checked: false},
        {id: 5, description: 'nap', checked: false}
      ]},
    ],
  }

  save=(todo, section)=>{
    const sections = this.state.sections
    const sectionIndex = sections.findIndex(scanningSection => scanningSection.name === section.name)
    const todoIndex = sections[sectionIndex].todos.findIndex(scanningTodo => scanningTodo.id === todo.id )
    sections[sectionIndex].todos[todoIndex].checked = !sections[sectionIndex].todos[todoIndex].checked

    this.setState({sections: sections })
  }

  selectActiveTodo=(todo)=>{
    this.setState({activeTodo: todo})
  }

  render(){
    return(
      <MyContext.Provider value={{
        state: this.state,
        save: this.save,
        selectActiveTodo: this.selectActiveTodo
      }} >
       {this.props.children}
     </MyContext.Provider>
    )
  }
}

class Todo extends React.Component{
  render(){
    const {section, todo} = this.props;
    return(
      <MyContext.Consumer>
        {(context) => (
          <div className={ context.state.activeTodo && context.state.activeTodo.id === todo.id ? 'active' : '' }>
            <input
              type="checkbox"
              id={`todo_${todo.id}`}
              checked={todo.checked}
              onChange={e => context.save(todo, section)}
            />
            <label onClick={e => context.selectActiveTodo(todo)}>{todo.description}</label>
          </div>
        )}
      </MyContext.Consumer>
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
              section={this.props.section}
            />
          ))}
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <MyContext.Consumer>
        {(context) => (
          <div className="App">
            {context.state.sections.map(section => (
              <Section
                key={section.id}
                section={section}
              />
            ))}
          </div>
        )}
      </MyContext.Consumer>

    );
  }
}

export default App;
