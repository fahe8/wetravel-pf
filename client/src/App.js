import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import LandingPage from "./components/landingPage/LandingPage";
import Login from "./components/log-in/Log-in";
import Detail from "./components/Detail/Detail";
import About from "./components/about/about.jsx";
import Create from "./components/create/Create";
import Hospedador from "./components/ProfileUser/hospedador/Hospedador";
import Huesped from "./components/ProfileUser/Huesped";
import Cart from "./components/cart/Cart";
import Favourites from "./components/favourites/Favourites";
import { CurrentLogin } from "./components/ProfileUser/CurrentLogin";
import { useDispatch } from "react-redux";
import { getHotels, getFavorites, getReservesByCart, getUserById, getServices } from "./redux/action/index"
import { useAuth0 } from "@auth0/auth0-react";
import { useLocalStorage } from "./localStorage/useLocalStorage";
import EditCreate from "./components/create/EditCreate";

function App() {


  // const {isAuthenticated} = useAuth0()
  useLocalStorage('userEmail', )

  let dispatch =  useDispatch()
// Tengo que organizar todos los dispatch para tener un codifo mas limpio 

  React.useEffect(() => {
    dispatch(getHotels())
    dispatch(getServices())
  }, []);


  return (
    <BrowserRouter>
      <div className="App min-h-screen h-screen">
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route path="/home/:id" component={Detail}></Route>
          <Route exact path="/createhotel" component={Create}></Route>
          <Route exact path="/edithotel/:id" component={EditCreate}></Route>
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
