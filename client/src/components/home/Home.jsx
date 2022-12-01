import React from "react";
import NavBar from "../navBar/NavBar";
import AllCards from "../allCards/AllCards";
import Filters from "../filters/Filters";

function Home() {
  return (
    <div>
      <NavBar />
      <div>
        <Filters></Filters>
        <AllCards />
      </div>
    </div>
  );
}

export default Home;
