import React from "react"
import NavBar from "../navBar/NavBar";
import AllCards from "../allCards/AllCards";


function Home() {


  return (
    <div>
      <NavBar />
      <div>
        <AllCards/>
      </div>
    </div>
  );
}

export default Home;
