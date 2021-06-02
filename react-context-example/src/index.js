import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import personContext from './contexts/personContext'

const persons = [
  {id:0, name:'sehong', age:27},
  {id:1, name:'lexie', age:27},
  {id:2, name:'ddakzzi', age:2},
]

ReactDOM.render(
  <React.StrictMode>
    {/* Provider를 통해 context를 set하고 value로 값 설정 */}
    {/* Provider로 감싼 모든 컴포넌트 내에서는 persons를 사용할 수 있음 */}
    <personContext.Provider value={persons}>
    <App /> 
    </personContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
