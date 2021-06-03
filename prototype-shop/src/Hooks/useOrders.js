import { useContext } from "react";
import AppStateContext from "../contexts/AppStateContext";

// context에 설정한 value중 orders만 따로 빼서 리턴하는 용도의 hook
 export default function useOrders(){
     const { orders } = useContext(AppStateContext);
     
     return orders;
 }
