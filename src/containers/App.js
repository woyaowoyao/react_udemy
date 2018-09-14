import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
//import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/AuxTest';

export const AuthContext = React.createContext(false);

class App extends PureComponent {

  constructor(props){
    super(props);
    console.log('App.js called from the constructor');
    this.state = {
      persons: [
        { id: 'qwert', name: 'Max', age: 28 },
        { id: 'asdf', name: 'Manu', age: 29 },
        { id: 'zxcv', name: 'Stephanie', age: 26 }
      ],
      otherState: 'some other value',
      showPersons: false,
      toogleClickCounter: 0,
      authenticated: false
    }
  }

  componentWillMount() { // since the 2 new methods addition, it is discouraged to use this method!!!!!! 
    console.log('app called from component will mount');
  }

  componentDidMount() {
    console.log('app called from component DID mount');
  }

  /*shouldComponentUpdate(nextProps, nextState){
    console.log("UPDTE app.JS inside shouldComponentUpdate", nextProps, nextState);
    //return nextProps.persons !== this.props.persons;
    return nextState.persons !== this.state.persons || nextState.showPersons != this.state.showPersons;
  }*/

  componentWillUpdate(nextProps, nextState) { // since the 2 new methods addition, it is discouraged to use this method!!!!!!
      console.log("UPDTE app.JS inside componentWillUpdate", nextProps, nextState);
  }

  componentDidUpdate() {
      console.log("UPDTE app.JS inside componentDidUpdate")
  }

  static getDerivedStateFromProps(nextProps, prevState) { // this is a new method in latest REACT version
    console.log("UPDTE app.JS inside getDerivedStateFromProps", nextProps, prevState);
    return prevState;
  }

  getSnapshotBeforeUpdate() {
    console.log("UPDTE app.JS inside getSnapshotBeforeUpdate");
  }

  /*state = {
    persons: [
      { id: 'qwert', name: 'Max', age: 28 },
      { id: 'asdf', name: 'Manu', age: 29 },
      { id: 'zxcv', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }*/

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
    this.setState((prevState, props) => { 
      return {
        showPersons: !doesShow, 
        toogleClickCounter: prevState.toogleClickCounter + 1 
      }
    });
  }

  loginHandler = () => {
    this.setState({ authenticated: true });
  }

  render () {
    console.log('app inside render');
    let persons = null;
    if ( this.state.showPersons ) {
      persons = <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} 
          />
    }
    /*return (
        <div className={classes.App}>
          <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
          <Cockpit 
            appTitle={this.props.title}
            persons={this.state.persons}
            showPersons={this.state.showPersons}
            clicked={this.togglePersonsHandler}
          />
          {persons}
        </div>
    );*/
    /*return (
      <WithClass classes={classes.App}>
          <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
          <Cockpit 
            appTitle={this.props.title}
            persons={this.state.persons}
            showPersons={this.state.showPersons}
            clicked={this.togglePersonsHandler}
          />
          {persons}
      </WithClass>
  );*/
  return (
    <Aux>
        <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
        <Cockpit 
          appTitle={this.props.title}
          persons={this.state.persons}
          showPersons={this.state.showPersons}
          login={this.loginHandler}
          clicked={this.togglePersonsHandler}
        />
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
    </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

//export default Radium(App);
export default withClass(App, classes.App);
