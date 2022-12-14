import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baned, getUser, updateUser } from "../../redux/action";
import Sidebar from "./sidebar";
import Navbar from "../navBar/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import "./dashboard.css"

export const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);
  const { user } = useAuth0();
  // console.log(user);
  const banear = (id, payload) => {
    baned(id, payload);
  };
  

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
    console.log(users)
 

  return (
    <div className="min-h-screen grid grid-cols-6 ">
      <Sidebar />
      <div className="xl:col-span-5  ">
        <Navbar />
        <div className="xl:col-span-5 p-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 nb-10">
          <div className="flex items-center justify-between background p-8 rounded-xl ml-5">
            <div>
              <h3 className="uppercase font-bold">Usuarios</h3>
              <br />
          
              {users
                ? users.map((el) => {
                  console.log()
                  if(el.status !== "admin"){
                    return (
                    <>
                    { el.baned === false  ?
                    (   
                      <>  
                        <img className="rounded" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8ODw0ODQ0QDhANDw8NDw8ODQ8NDw0PFREWFhURFRUYHSggGBolGxUTITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAQIEAwUH/8QALRABAAIBAgQFAwMFAAAAAAAAAAERAgMEITFRYRJBcbHwUoGRMqHRIkKS4fH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/cbLRAastEBqy2VBbLZAastEBqy2VBbLZUFstEBqy0AWy2VBbLZAastEBqy2VBbLZUC1ZABLLBRLLBRLLBRLLBRLLBRLLBRLLBRLLBRLLBRLLBRLLBRLLBRLLBRLLBQAQQBRAFEAUQBRAFEAURMs4jjMxHrNA0PONbD68f8AKGwUQBRAFEAUQBRAFEAWvlf6E+fOACWWAFlgBZYAWWAFlgBby19xGHPjPSObz3e58PDH9Xs+dM3xniD21d3nl5+GOkfy8JnqADWGpOP6ZmPSWQHVhvs451PrFOjQ3sZTUx4Z/aXzQH27Lcm13UTWOXCevV1gWWAFlgBZYAWWAAAAzZYNDNlg0M2WDQzZYNPLcavgxmfPlHq3b5++1Lyr6fcHPlNzc85QAAAAAAAHfsde/wCmeccvRwN6GVZYz3B9gZssGhmywaGbLBoZssGhm1BA+ewAAAB89wA+e4BMvj55XMz1l9fLlPpL48gAAAAAAAALjzj1hGtKLyxjvAPrRyUAPnuAAAAfPYAZFoBAAAAAAAAHy9bGspju+nlNRM9It8vUznKbnzBkAAAAAAAB07HC5menu5ndsZ/pntIOkAAAAAAAAAARAaEAUQBRACXys4qZjpL6r5u4w8OU9+MA8wAAAAAAAH0NnFYR3fPfR2+NYwD2EAUQBRAFGVBRkACywAssALLACywHnraUZ8/Lzellg+XlFTMdEb1orKfVgAAAAAAHTtdGMoufKXY8drFYR3uXtYAWWAFlgBZYAWWAFoAAAAAAAAAADk3uPGJ68HM79xjE4zflxcAAAAAAPXbYXlHbiDtwioiOkNIoAAAAAAAAIAAAAAAAADOWcRzmgaTLKI4zwc2puvpj7y58spnnNg9dfX8XCOEe7xAAAAABccpibhAHfo6sZR384ej5kS99PczHPj7g7BjDUjLlP8tgAAAWAAAFgMqgADGrqxjHfoDeWURxmXPnuvpi+8vDPOcpuf8AjIPWdxl1r7POZvnxQAAAAAAAAAAAAAiW41so/un3YAesbjLrfrD1w3MecV+7lAfRib5K+fp6k48vw7dPUjKLgG0AFEtQZstADPOomXDnlc3L23OXGujwAAAAAAAAAAAAAAAAAAAAAa08/DNsgPoRlfEtz7XLnH3e4LYgAFpMg485uZnuyAAAAAAAAAAAAAAAAAAAAAAAN6M1lH4djhx5x6w7bBQASPn5lM+U+gA4gAAAAAAAAAAAAAAAAAAAAAAAHdiAKAD/2Q==" alt="imagen not found" srcset="" />
                        <strong className="block">{el.name}</strong>
                        <button className="box-decoration-clone bg-slate-200 text-black px-2 mt-2 mr-2 rounded mb-3" onClick={updateUser(el.email, {"status" : "admin"})}>Hacer administrador</button>
                        <button className="box-decoration-clone bg-slate-200 text-black px-2 mt-2 ml-2 rounded mb-3" onClick={() => {dispatch(baned({ baned:true }, el.id))}}>Banear usuario</button>
                      </>
                    ) :
                    <>
                      <img className="rounded" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8ODw0ODQ0QDhANDw8NDw8ODQ8NDw0PFREWFhURFRUYHSggGBolGxUTITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAQIEAwUH/8QALRABAAIBAgQFAwMFAAAAAAAAAAERAgMEITFRYRJBcbHwUoGRMqHRIkKS4fH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/cbLRAastEBqy2VBbLZAastEBqy2VBbLZUFstEBqy0AWy2VBbLZAastEBqy2VBbLZUC1ZABLLBRLLBRLLBRLLBRLLBRLLBRLLBRLLBRLLBRLLBRLLBRLLBRLLBRLLBQAQQBRAFEAUQBRAFEAURMs4jjMxHrNA0PONbD68f8AKGwUQBRAFEAUQBRAFEAWvlf6E+fOACWWAFlgBZYAWWAFlgBby19xGHPjPSObz3e58PDH9Xs+dM3xniD21d3nl5+GOkfy8JnqADWGpOP6ZmPSWQHVhvs451PrFOjQ3sZTUx4Z/aXzQH27Lcm13UTWOXCevV1gWWAFlgBZYAWWAAAAzZYNDNlg0M2WDQzZYNPLcavgxmfPlHq3b5++1Lyr6fcHPlNzc85QAAAAAAAHfsde/wCmeccvRwN6GVZYz3B9gZssGhmywaGbLBoZssGhm1BA+ewAAAB89wA+e4BMvj55XMz1l9fLlPpL48gAAAAAAAALjzj1hGtKLyxjvAPrRyUAPnuAAAAfPYAZFoBAAAAAAAAHy9bGspju+nlNRM9It8vUznKbnzBkAAAAAAAB07HC5menu5ndsZ/pntIOkAAAAAAAAAARAaEAUQBRACXys4qZjpL6r5u4w8OU9+MA8wAAAAAAAH0NnFYR3fPfR2+NYwD2EAUQBRAFGVBRkACywAssALLACywHnraUZ8/Lzellg+XlFTMdEb1orKfVgAAAAAAHTtdGMoufKXY8drFYR3uXtYAWWAFlgBZYAWWAFoAAAAAAAAAADk3uPGJ68HM79xjE4zflxcAAAAAAPXbYXlHbiDtwioiOkNIoAAAAAAAAIAAAAAAAADOWcRzmgaTLKI4zwc2puvpj7y58spnnNg9dfX8XCOEe7xAAAAABccpibhAHfo6sZR384ej5kS99PczHPj7g7BjDUjLlP8tgAAAWAAAFgMqgADGrqxjHfoDeWURxmXPnuvpi+8vDPOcpuf8AjIPWdxl1r7POZvnxQAAAAAAAAAAAAAiW41so/un3YAesbjLrfrD1w3MecV+7lAfRib5K+fp6k48vw7dPUjKLgG0AFEtQZstADPOomXDnlc3L23OXGujwAAAAAAAAAAAAAAAAAAAAAa08/DNsgPoRlfEtz7XLnH3e4LYgAFpMg485uZnuyAAAAAAAAAAAAAAAAAAAAAAAN6M1lH4djhx5x6w7bBQASPn5lM+U+gA4gAAAAAAAAAAAAAAAAAAAAAAAHdiAKAD/2Q==" alt="imagen not found"/>
                      <strong className="block">{el.name}</strong>
                      <button className="box-decoration-clone bg-slate-200 text-black px-2 mt-2 ml-2 rounded mb-3" onClick={() => {dispatch(baned({ baned: false }, el.id))}}>Desbanear</button>
                    </>
                    }
                    </>      
                     
                    );
                  }
                  })
                : "esta vacio"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};





                        // <div>
                        // {el.baned === false?
                        //   (<>
                        // <img src={user.picture} alt="img not found" />
                        // <p>{el.name}</p>
                        // <button
                        //   onClick={() => {
                        //     dispatch(baned({ baned: true }, el.id));
                        //   }}
                        // >
                        //   <strong>Eliminar usuario</strong>
                        // </button>
                        //  </>):
                        //   (<>
                        //   <img src={user.picture} alt="img not found" />
                        //   <p>{el.name}</p>
                        //   <button
                        //   onClick={() => {
                        //     dispatch(baned({ baned: false }, el.id));
                        //   }}
                        // >
                        //   <strong>Desbanear usuario</strong>
                        // </button>
                        //   </>)
                        // }}
                        // <div/>