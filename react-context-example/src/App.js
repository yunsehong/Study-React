import logo from './logo.svg';
import './App.css';
import Example1 from './components/Example1.jsx'
import Example2 from './components/Example2.jsx'
import Example3 from './components/Example3.jsx'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Example1 />
        <Example2 />
        <Example3 />
      </header>
    </div>
  );
}

export default App;
