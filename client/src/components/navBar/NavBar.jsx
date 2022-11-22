import React from "react";
import Search from "../search/Search";
const NavBar = () => {
  return (
    <header className=" h-20 bg-[color:var(--second-bg-color)] flex justify-between text-center shadow-lg">
      <figure className=" w-40 h-20 bg-cyan-700">
        <img src="" alt="" />
      </figure>
      <div className=" w-1/2 h-20  bg-white py-3 px-20">
        <Search></Search>
      </div>
      <nav className=" w-65 flex justify-between items-center text-xl gap-5">
        <p >About Us</p>
        <div className=" h-10 flex justify-between items-center gap-5  hover:bg-cyan-800 cursor-pointer p-7 rounded-full border-2 border-black">
          <p>Login</p>
          <span className=" bg-[url('/src/assets/icons/user.svg')] bg-center bg-cover bg-no-repeat w-10 h-10"></span>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
