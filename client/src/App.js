import './App.css';
import {BrowserRouter, Route, Switch } from "react-router-dom" 
import Home from './components/home/Home';
import Login from './components/log-in/Log-in';
import Signup from './components/Sign-up/Sign-up';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/Login" component={Login}/>
        <Route exact path="/Signup" component={Signup}/>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
