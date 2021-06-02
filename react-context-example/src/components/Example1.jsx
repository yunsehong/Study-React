import personContext from "../contexts/personContext";

export default function Example1(){
    // Consumer를 통해 personContext에서 설정한 value를 get 
    return(
    <personContext.Consumer>    
        {(persons) => (
            <ul>
                {persons.map((person) => (
                    <li>{person.name}</li>
                ))}
            </ul>
        )}
    </personContext.Consumer>
    )
}