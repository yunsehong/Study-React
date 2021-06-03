import useActions from "../Hooks/useActions";
import usePrototypes from '../Hooks/usePrototypes'

export default function Prototypes(){
    // const {prototypes} = useContext(AppStateContext);
    // -> context에 value로 설정한 prototypes라는 key로 가져오는 것 
    const prototypes = usePrototypes();
    // 직접적으로 useContext를 활용해서 가져오는것이 아니라 따로 hook으로 빼서 이용
    const {addToOrder} = useActions();
    return (
        <main>
            <div className="prototypes">{prototypes.map(prototype => {  // prototypes를 map돌면서 하나씩 꺼냄
                const {id, thumbnail, title, price, desc, pieUrl} = prototype;  // prototype으로부터 저것들 빼옴
                const click = () => {
                    addToOrder(id);
                }
                return (    // jsx element return
                <div key={id} className="prototype">    
                    <a href={pieUrl} target="_BLANK" rel="noreferrer">
                        {/* target="_BLANK" 새창으로 열리게 하는 속성 */}
                        <div style={{
                            padding: '25px 0 33px 0'
                        }}>
                            <video 
                                autoPlay
                                loop
                                playsInline
                                className="prototype__artwork prototype__edit"
                                src={thumbnail}
                                style={{
                                    objectFit:"contain"
                                }}
                            />
                        </div>
                    </a>

                    <div className="prototype__body">
                        <div className="prototype__title">
                            {/* plus btn */}
                            <div className="btn btn--primary float--right" onClick={click}> 
                                <i className="icon icon--plus"></i>
                            </div>
                            {title}
                        </div>
                        <p className="prototype__price">$ {price}</p>
                        <p className="prototype__desc">{desc}</p>
                    </div>
                </div>);
            })}</div>
        </main>
    );
}