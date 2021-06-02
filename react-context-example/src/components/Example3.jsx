import { useContext } from "react";
import personContext from "../contexts/personContext";

export default function Example3(){
    // useContext라는 hook 사용
    // 이게 가장 많이 쓰이는 방식
    // 변수에 context를 담을 수 있기 때문에 여러 context를 사용할 수도 있고 제일 간편함 
    const persons = useContext(personContext);
    return(
        <ul>
            {persons.map((person) => (
                <li>{person.name}</li>
            ))}
        </ul>
    )
}