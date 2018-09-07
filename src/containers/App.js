import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
//import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  state = {
    persons: [
      { id: 'qwert', name: 'Max', age: 28 },
      { id: 'asdf', name: 'Manu', age: 29 },
      { id: 'zxcv', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  switchNameHandlerDeprecated = ( newName ) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState( {
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    } )
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons; // if we do this, we are actully having access to the original persons array in state, because of the reference stuff in js
    // what we would be doing is to modify directly state, which is BAD practice in React, we should create a copy of the property we want to modify and then set state
    // using setState method.
    // other way const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex((pers)=> {
      return pers.id === id;
    });
    //const person = this.state.persons[personIndex]; this way we are mutating the eprson directly from state, we should not do this, ALWAYS CREATE A COPY WHEN USING REFERENCES!
    const person = {...this.state.persons[personIndex]}; // using spread operator, this will spread all the props of the found object to the new object.
    // const person = Object.assign({}, this.state.persons[personIndex]); this is another alternative
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState( { persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  render () {
    let persons = null;
    if ( this.state.showPersons ) {
      persons = <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}/>
    }

    return (
        <div className={classes.App}>
          <Cockpit 
            appTitle={this.props.title}
            persons={this.state.persons}
            showPersons={this.state.showPersons}
            clicked={this.togglePersonsHandler}
          />
          {persons}
        </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

//export default Radium(App);
export default App;
