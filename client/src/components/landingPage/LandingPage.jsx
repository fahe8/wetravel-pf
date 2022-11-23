import React from "react";
import NavBar from "../navBar/NavBar";
import Search from "../search/Search";
function LandingPage() {
  return (
    <section className="h-[100%]  relative overflow-hidden">
      <Search></Search>
    <button className="w-[200px] h-[100px] absolute ">See </button>
    </section>
  );
}

export default LandingPage;
