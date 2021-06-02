import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch, Link, NavLink, useParams} from 'react-router-dom';

function Home(){
  return(
    <div>
      <h2>Home</h2>
      Home...~
    </div>
  )
}

var contents = [
  {id:1, title:'HTML', desc:'HTML is...'},
  {id:2, title:'JS', desc:'JS is...'},
  {id:3, title:'React', desc:'React is...'},
]
function Topic(){
  var params = useParams();
  console.log('params', params, params.topic_id);
  var topic_id = params.topic_id;
  var selected_topic = {
    title:'Sorry',
    desc:'Not Found'
  }
  for(var i = 0; i < contents.length; i++){
    if(contents[i].id === Number(topic_id)){
      selected_topic = contents[i];
      break;
    }
  }
  return (
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.desc}
    </div>
  )
}

function Topics(){
  var list = [];
  for(var i = 0; i < contents.length; i++){
    list.push(<li key={contents[i].id}><NavLink to={'/topics/'+contents[i].id}>{contents[i].title}</NavLink></li>)
  }
  return(
    <div>
      <h2>Topics</h2>
      <ul>
        {list}
      </ul>
      {/* <Switch>
        <Route path="/topics/1">HTML is...</Route>
        <Route path="/topics/2">JS is...</Route>
        <Route path="/topics/3">React is...</Route> 
      </Switch> */}
      {/* 하나의 Route로 useParams hook을 이용해서 선택된 id값에 해당하는 콘텐츠 내용 보여주기 */}
      <Route path="/topics/:topic_id"><Topic></Topic></Route>
    </div> 
  )
}
function Contact(){
  return(
    <div>
      <h2>Contact</h2>
      Contact...~
    </div>
  )
}

function App(){
  return(
    <div>
      <h1>React Router DOM example</h1>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/topics">Topics</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        {/* NavLink는 내가 어디 링크에 위치해있는지 class="action" 이 지정되면서 알 수 있음 */}
      </ul>
      <Switch>  
      {/* Switch는 순서대로 제일 위에 걸리는 컴포넌트 하나만 출력*/}
      {/* Switch에서 exact를 쓰면 아무것도 포함되지 않는 url 접속했을 때 Not Found 할 수 있음*/}
      <Route path="/" exact><Home /></Route>
      <Route path="/topics"><Topics /></Route>
      <Route path="/contact"><Contact /></Route>
      <Route path="/">Not Found</Route>
      </Switch>
    </div>
  )
}

// BrowserRouter : 최상위 컴포넌트를 감싸주는 Wrapper component
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


