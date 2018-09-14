import React, { Component } from 'react';
import classes from './Person.css';
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/AuxTest';
import PropTypes from 'prop-types';
import { AuthContext } from '../../../containers/App';

/*const person = ( props ) => {
    /*const style = {
        '@media (min-width: 500px)' : {
            width: '450px'
        }
    };*/

   /* return (
        <div className={classes.Person}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
};*/



class Person extends Component {

    constructor(props){
        super(props);
        console.log('person.js called from the constructor');
        this.inputElementRef = React.createRef();
    }
    
    componentWillMount() {
        console.log('person called from component will mount');
    }
    
    componentDidMount() {
        console.log('person called from component DID mount');
        if(this.props.position === 0){
            this.inputElementRef.current.focus();
        }
    }

    focus() {
        this.inputElementRef.current.focus();
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("UPDTE persons.JS inside shouldComponentUpdate", nextProps, nextState);
        //return nextProps.persons !== this.props.persons;
        return true;
    }

    componentWillUpdate(nextProps, nextState){
        console.log("UPDTE persons.JS inside componentWillUpdate", nextProps, nextState)
    }

    componentDidUpdate() {
        console.log("UPDTE persons.JS inside componentDidUpdate")
    }

    render () {
        console.log('person called from render');
        /*return [   Different way to return > 1 elements, using arrays
            <p key="1" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>,
            <p key="2">{this.props.children}</p>,
            <input key="3" type="text" onChange={this.props.changed} value={this.props.name} />
        ];*/ 
        /*return (
            <WithClass classes={classes.Person}> 
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name} />
            </WithClass>
        )*/
        //ref={(inp) => { this.inputElement = inp; }}
        return (
            <Aux>
                <AuthContext.Consumer>
                    { auth => auth ? <p>I'm authenticated</p> : null} 
                </AuthContext.Consumer>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input
                ref={this.inputElementRef}
                type="text" 
                onChange={this.props.changed} 
                value={this.props.name} />
            </Aux>
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func 
};

//export default Radium(person);
export default withClass(Person, classes.Person);