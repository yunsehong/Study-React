import { useContext } from "react";
import AppStateContext from "../contexts/AppStateContext";

// context에 설정한 value중 prototypes만 따로 빼서 리턴하는 용도의 hook
 export default function usePrototypes(){
     const {prototypes} = useContext(AppStateContext);
     // hook 안에서 다른 hook 사용 가능 
     return prototypes;
 }
