import React, { PureComponent } from 'react';
import Person from './Person/Person';

/*const persons = (props) => {
    return (
        props.persons.map(( person, index ) => {
            return <Person
              key={person.id}
              click={() => props.clicked( index )}
              name={person.name}
              age={person.age}
              changed={( event ) => props.changed( event, person.id )} />
          })
    );
}*/

class Persons extends PureComponent {

    constructor(props){
        super(props);
        console.log('persons.js called from the constructor');
        this.lastPersonRef = React.createRef();
    }
    
    componentWillMount() {
        console.log('persons called from component will mount');
    }
    
    componentDidMount() {
        console.log('persons called from component DID mount');
        this.lastPersonRef.current.focus();
    }

    componentWillReceiveProps(nextProps) { // since the 2 new methods addition, it is discouraged to use this method!!!!!!
        console.log("UPDTE PERSONS.JS inside componentWillReceiveProps", nextProps);
    }

    /*shouldComponentUpdate(nextProps, nextState){
        console.log("UPDTE PERSONS.JS inside shouldComponentUpdate", nextProps, nextState);
        return nextProps.persons !== this.props.persons;
       // return true;
    }*/

    componentWillUpdate(nextProps, nextState){
        console.log("UPDTE PERSONS.JS inside componentWillUpdate", nextProps, nextState)
    }

    componentDidUpdate() {
        console.log("UPDTE PERSONS.JS inside componentDidUpdate")
    }

    render () {
        console.log('persons called from render');
        return this.props.persons.map(( person, index ) => {
            return <Person
              key={person.id}
              click={() => this.props.clicked(index)}
              name={person.name}
              position={index}
              ref={this.lastPersonRef}
              age={person.age}
              changed={( event ) => this.props.changed( event, person.id )} />
          });
    }
}

export default Persons;