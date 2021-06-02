import React from 'react';
import personContext from '../contexts/personContext';

export default class Example2 extends React.Component{
    // static contextType = personContext;
    render(){
        const persons = this.context;
        return(
            <ul>
            {persons.map((person) => (
                <li>{person.name}</li>
            ))}
            </ul>
        );
    }
}

Example2.contextType = personContext;
// static contextType = personContext; 과 같음
// => 이런식으로 하면 function component에서도 사용 가능 
