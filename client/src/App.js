import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import LandingPage from "./components/landingPage/LandingPage";
import NavBar from "./components/navBar/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="App min-h-screen h-screen">
      <NavBar></NavBar>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
