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
import { ProfileHuesped } from "./components/ProfileUser/Huesped/ProfileHuesped";
import Cart from "./components/cart/Cart";
import Favourites from "./components/favourites/Favourites";
import { HotelsHos } from "./components/ProfileUser/hospedador/hotels/HotelsHos";
import { UserImages } from "./components/ProfileUser/Huesped/UserImages";
import { useDispatch, useSelector } from "react-redux";
import {
  getHotels,
  getFavorites,
  getReservesByCart,
  getUserById,
  getServices,
} from "./redux/action/index";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocalStorage } from "./localStorage/useLocalStorage";
import { Images } from "./components/Images/Images";
import EditCreate from "./components/create/EditCreate";
import Dashboard from "./components/Dashboard/Dashboard";
import { AdminCards } from "./components/Dashboard/AdminCards";
import { AdminReviews } from "./components/Dashboard/AdminReviews";
import { AccessDenied } from "./components/Dashboard/AccessDenied";
import { AdminImages } from "./components/Dashboard/AdminImages";
import Confirmacion from "./components/confirmacion/Confirmacion"
import Paginate from "./components/Paginate/Paginate"
import { AdminUsers } from "./components/Dashboard/AdminUsers";
import Baned from "./components/baned/baned"

function App() {
  const {user} = useAuth0()
  useLocalStorage("userEmail");

  let dispatch = useDispatch();
  // Tengo que organizar todos los dispatch para tener un codifo mas limpio

  React.useEffect(() => {
    dispatch(getHotels());
    dispatch(getServices());
  }, []);

  React.useEffect(() => {
    if(user) {
      dispatch(getReservesByCart(user.email))
    }

  }, [user]);


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
          <Route exact path="/huesped" component={ProfileHuesped} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/favourites" component={Favourites} />
          <Route exact path="/user-images" component={UserImages} />
          <Route exact path="/images" component={Images} />
          <Route path= "/anfitrion/hotels" component={HotelsHos} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/admin-cards" component={AdminCards} />
          <Route exact path="/admin-reviews" component={AdminReviews} />
          <Route exact path="/admin-images" component={AdminImages} />
          <Route exact path="/admin-users" component={AdminUsers} />
          <Route exact path="/access-denied" component={AccessDenied} />
          <Route exact path="/confirmacion/:id" component={Confirmacion} />       
          <Route exact path="/baned" component={Baned}/>
          <Route path="#" element={<Home />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
