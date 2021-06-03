import useActions from '../Hooks/useActions';
import useOrders from '../Hooks/useOrders'
import usePrototypes from '../Hooks/usePrototypes';
import { useMemo } from 'react';
 
export default function Orders(){
    const orders = useOrders();
    const prototypes = usePrototypes();
    // 밑에서 버튼 클릭시 remove와 removeAll 함수 호출 -> useActions hook에서 가져옴
    const { remove, removeAll } = useActions();

    // 담은 상품의 totalPrice 구하는 함수 
    // useMemo : 연산된 값을 재사용하는 hook 
    const totalPrice = useMemo(() => {
        return orders.map(order => {
            const {id, quantity} = order;
            const prototype = prototypes.find(p => p.id === id);
            console.log(prototype.price * quantity);    // ex) [30], [30,20] , [30,20,10]
            return prototype.price * quantity;
        }).reduce((l, r) => l + r, 0) ; // 초기값 0 
    }, [orders, prototypes]);   // orders와 prototypes가 변하면 함수 작동
                                // 사실상 prototypes는 변하지 않기 때문에 orders가 변하면 작동
        // reduce : 인자로 주어진 함수를 모든 요소에 적용하여 만들어진 단일 값을 반환
        // 배열 요소에 대해 왼쪽에서 오른쪽으로 적용
        // array.reduce(function())
        // [30,20,10] -> 60


    if(orders.length === 0){
        return (
            <aside>
                <div className="empty">
                    <div className="title">You don't have any orders</div>
                    <div className="subtitle">Click on a + to add an orders</div>
                </div>
            </aside>
        );
    }

    return(
        <aside>
           <div className="order">
                <div className="body">
                    {orders.map(order => {  // orders를 map 돌면서 order를 꺼냄
                        const { id } = order;   // order에서 id를 꺼내옴 
                        // prototypes 리스트에서 선택한 id와 리스트에있는 id가 같으면 단품 가져오기
                        const prototype = prototypes.find(p => p.id === id);   
                        const click = () => {
                            remove(id); // remove 함수 호출
                        };
                        return( 
                            // map 돌고 있으므로 id가 필요함
                            <div className="item" key={id}> 
                                <div className="img">
                                    <video src={prototype.thumbnail}/>
                                </div>
                                <div className="content">
                                    <p className="title">{prototype.title} x {order.quantity}</p>
                                </div>
                                <div className="action">
                                    <p className="price">$ {prototype.price * order.quantity}</p>
                                    <button className="btn btn--link">
                                        {/* remove button */}
                                        <i className="icon icon--cross" onClick={click}></i>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="total">
                    <hr />
                    <div className="item">
                        <div className="content">Total</div>
                        <div className="action">
                            <div className="price">$ {totalPrice}</div>
                        </div>
                        <button className="btn btn--link">
                            <i className="icon icon--delete" onClick={removeAll}/>    
                        </button> 
                    </div>
                    <button className="btn btn--secondary" style={{width: "100%" ,marginTop: 10}}>Checkout</button>
                </div>
           </div>
        </aside>
    );
}