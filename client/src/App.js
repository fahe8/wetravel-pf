import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import LandingPage from "./components/landingPage/LandingPage";
import Login from "./components/log-in/Log-in";
import Detail from "./components/Detail/Detail";
import About from "./components/about/about.jsx";
import Create from "./components/create/Create";
import Hospedador from "./components/ProfileUser/Hospedador";
import Huesped from "./components/ProfileUser/Huesped";
import Cart from "./components/cart/Cart";
import Favourites from "./components/favourites/Favourites";
import { CurrentLogin } from "./components/ProfileUser/CurrentLogin";

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
          <Route exact path="/about" component={About} />
          <Route exact path="/anfitrion" component={Hospedador} />
          <Route exact path="/huesped" component={Huesped} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/favourites" component={Favourites} />
          <Route path="/users/:id" component={CurrentLogin} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
