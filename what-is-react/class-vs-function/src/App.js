
import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);
  return (
    <div className="container">
      <h1>ClassComponent vs function Component</h1>
      <input type="button" value="remove func" onClick={function(){
        setFuncShow(false);
      }}></input>
      <input type="button" value="remove comp" onClick={function(){
        setClassShow(false);
      }}></input>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null} 
      {/* funcShow가 true면 FuncComp가 나오고 false면 아무것도 안나오게 */}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
      {/* classShow가 true면 ClassComp가 나오고 false면 아무것도 안나오게 */}
    </div> 
  );
}

// hook 을 이용하여 state 설정 (useState호출)
// lifecycle 알아보기(useEffect이용)
var funcStyle = 'color:yellow';
var funcId = 0;
function FuncComp(props){
  var numberState = useState(props.initNumber); //userState는 2개의 값으로 이루어져 있는 배열
  // state를 만들고 싶다면 useState에 첫번째 인자로 값을 전달하면 0번째 배열에 들어가고
  // 그게 state의 초기값이 됨 
  var number = numberState[0];  // 첫번째 값에는 현재 상태 값
  var setNumber = numberState[1]; // userState 배열의 두번째 값에는 함수가 담김
  // 그 함수를 이용하여 class의 setState처럼 state값을 바꿀 수 있다 

//   var dateState = useState((new Date()).toString());
//   var _date = dateState[0];
//   var setDate = dateState[1];

  // 위에꺼랑 똑같은 코드
  var [_date, setDate] = useState((new Date()).toString());  

  console.log('numberState', numberState);

  // function을 인자로 전달하고 
  // 인자로 전달된 함수가 끝난 후에 동작하는 함수 -> useEffect = componentDidMount & componentDidUpdate
  // ex) 컴포넌트 자체의 렌더링과는 상관없는 저 멀리있는 것을 예외적으로 바꿀 때
  // side effect(부작용 함수)
  useEffect(function(){
    console.log('%cfunc => useEffect number'+(++funcId),funcStyle);
    // document.title = number + ' : ' + _date;
    //-> random이나 date 버튼 누른 후 update되면 웹 타이틀이 바뀜

    document.title = number;
    // 컴포넌트가 할일을 다 한 후 소멸될 때 뒷처리를 해주는 함수
    // class -> componentWillUnmount()
    // function -> useEffect에 리턴 값을 주면 됨
    // 리턴 값은 함수여야 함
    return function(){
      console.log('%cfunc => useEffect number return'+(++funcId),funcStyle);
    }
    // => useEffect가 실행되고 나서 그 다음 useEffect가 실행되기 전에 
    // 그 때 뭔가를 해야하는 작업(정리정돈 일종의 clean up)
  },[number]);  
  // 배열안에 있는 인자의 상태값이 바뀌었을 때만 useEffect에 인자로 전달된 함수가 호출 되도록 약속되어있음
  // => skipping effect

  useEffect(function(){
    console.log('%cfunc => useEffect _date'+(++funcId),funcStyle);
    document.title = _date;
    return function(){
      console.log('%cfunc => useEffect _date return'+(++funcId),funcStyle);
    }
  },[_date]); // date 버튼을 눌러서 date값이 변경 됐을 때에만 실행됨

  useEffect(function(){
    console.log('%cfunc => useEffect(componentDidMount & componentDidUpdate) B '+(++funcId),funcStyle);
    document.title = number + ' : ' + _date;
  });
  // => useEffect함수는 여러개 사용 가능 

  // userEffect를 컴포넌트 생성시(딱 한번)만 실행하고 싶을 때
  // useEffect(f,[]) 함수 다음 인자로 빈 배열 전달
  useEffect(function(){
    console.log('%cfunc => useEffect(ONLY componentDidMount)'+(++funcId),funcStyle);
  },[]);
  // => 업데이트를 여러번 해도 맨처음 생성시 한번만 호출 됨
  

  console.log('%cfunc => render'+(++funcId),funcStyle);
  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {props.initNumber}</p>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>
        <input type="button" value="random" onClick={
          function(){
            setNumber(Math.random());
          }
        }></input>
        <input type="button" value="date" onClick={
          function(){
            setDate((new Date()).toString());
          }
        }></input>
    </div>
  );
}

var classStyle = 'color:red';

class ClassComp extends React.Component{
  state = {
    number:this.props.initNumber, // state 초기값 
    date:(new Date()).toString()
  }

  // lifecycle
  // render()가 실행되기 전 
  componentWillMount(){
    console.log('%cclass => componentWillMount',classStyle);
  }
  // render()가 실행되고 난 후 
  componentDidMount(){
    console.log('%cclass => componentDidMount',classStyle);
  }
  // render()가 실행 될건지 말건지
  shouldComponentUpdate(nextProps, nextState){
    console.log('%cclass => shouldComponentUpdate',classStyle);
    return true;  
    // true -> render 실행 
    // false -> render 실행X
  }

  componentWillUpdate(nextProps, nextState){
    console.log('%cclass => componentWillUpdate',classStyle);
  }

  componentDidUpdate(nextProps, nextState){
    console.log('%cclass => componentDidUpdate',classStyle);
  }

  componentWillUnmount(){
    console.log('%cclass => componentWillUnmount',classStyle);
  }
  



  render(){
    console.log('%cclass => render',classStyle);
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input type="button" value="random" onClick={
          function(){
            this.setState({number:Math.random()})
          }.bind(this)
        }></input>
        <input type="button" value="date" onClick={
          function(){
            this.setState({date:(new Date()).toString()})
          }.bind(this)
        }></input>
      </div>
    )
  }
}
export default App;

// hook
// 기존에 클래스 스타일 코딩에서만 가능했던 여러 작업을
// 함수 스타일 코딩에서도 가능하게 해주는 기능

