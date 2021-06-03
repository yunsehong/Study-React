import { useContext } from "react";
import AppStateContext from "../contexts/AppStateContext";

 export default function useActions(){
     const { addToOrder, remove, removeAll } = useContext(AppStateContext);
     
     return { addToOrder, remove, removeAll }; 
     // 상태를 주는게 아니라 함수를 주는거임
     // 상태를 변경하는 함수를 받아서 보내주는 훅 
 }
