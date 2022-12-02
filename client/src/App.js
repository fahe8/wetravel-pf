import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import LandingPage from "./components/landingPage/LandingPage";
import Login from "./components/log-in/Log-in";
import Detail from "./components/Detail/Detail";
import About from "./components/about/about.jsx";
import Create from "./components/create/Create";
import Hospedador from './components/ProfileUser/Hospedador';
import Huesped from './components/ProfileUser/Huesped';

function App() {
  return (
    <BrowserRouter>
      <div className="App min-h-screen h-screen">
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route path="/home/:id" component={Detail}></Route>
          <Route exact path="/createhotel" component={Create}></Route>
          <Route exact path="/about" component={About}/>
          <Route exact path="/anfitrion" component={Hospedador}/>
          <Route exact path="/huesped" component={Huesped}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
