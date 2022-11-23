import React from "react";
import NavBar from "../navBar/NavBar";
import Search from "../search/Search";
function LandingPage() {
  return (
    <div>
      <section className="w-screen h-screen">
        <div className="w-[1500px] h-36 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
          <Search></Search>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
