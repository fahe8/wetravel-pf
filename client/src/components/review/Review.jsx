import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { postReview } from "../../redux/action/index";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserById } from "../../redux/action/index";
import { ToastContainer, toast } from "react-toastify";
import './Review.css'
import { useEffect } from "react";


function Review({ name }) {
  const [stars, setStars] = useState([1, 2, 3, 4, 5]);
  const [current, setCurrent] = useState(undefined);
  const { user } = useAuth0();
  const [input, setInput] = useState({
    nameUser: user?.name,
    stars: 0,
    comments: [],
    nameHotel: name,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getUserById(user.email))
    }
  }, [dispatch, user])

  function handleClick() {
    switch (input.stars || setCurrent) {
      case 0:
        return "Evaluar";
      case 1:
        return "Insatisfecho";
      case 2:
        return "Insatisfecho";
      case 3:
        return "Normal";
      case 4:
        return "Satisfecho";
      case 5:
        return "Muy Satisfecho";
      default:
        return "Evaluar";
    }
    // setCurrent(index);
    // setInput({ ...input, stars: index });
  }
  const messageOk = () => {
    toast("💛 Gracias por su opiñion", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  };
  const messageError = () =>{
    toast.error('Debes dar una calificación y un comentario al respecto con al menos 10 caracteres', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  function handleChange(e) {
    e.target.name === 'comments' ?
    setInput({ ...input, nameUser: user?.name, nameHotel: name, [e.target.name]: [e.target.value] }):
    setInput({ ...input, nameUser: user?.name, nameHotel: name, [e.target.name]: e.target.value })
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (input.stars === 0 || !input.comments.length || input.comments[0].length <= 9) {
      messageError();
    } else {
      if (input.stars !== 0 || input.comments[0].length >= 10) {
        dispatch(postReview(input));
        setInput({ nameUser: user?.name, stars: 0, comments: [], nameHotel: name, });
        setCurrent(0);
        setStars([1, 2, 3, 4, 5]);
        messageOk();
      }
    }
  }

  return (
    <div >
      <div className="p-3 text-3xl font-semibold">
        <h1>Inserte acá sus comentarios acerca de este hotel!</h1>
      </div>

      <form className="contain_review" onSubmit={(e) => handleSubmit(e)}>

        
        <ToastContainer />

        <div
          onChange={(e) => handleChange(e)}
          className="contain_review bg-slate-50  p-3 w-4/5 rounded-md shadow-xl"
          >        
        <img
          src={user?.picture}
          alt="icon"
          className="bg-center bg-cover bg-no-repeat w-10 h-10 rounded-full m-3"       
        />

          <textarea
            value={input.comments}
            name="comments"
            className="resize-none  w-3/5 text-base bg-white rounded-lg border  h-9 p-1  outline-none"
            placeholder="Inserte acá su comentario">
          </textarea>

          <div className="grid grid-rows-2 m-3">
          
          <div className="contain_review font-medium">
          <h1>{handleClick()}</h1>
          {Array(5)
            .fill()//* Llena la info y permite vizualizar las STARS
            .map((_, index) =>
              input.stars >= index + 1 || setCurrent >= index + 1 ? (
                <AiFillStar
                
                key={index}
                  onMouseOver={() => !input.stars && setCurrent(index + 1)}
                  onMouseLeave={() => setCurrent(undefined)}
                  style={{ color: "orange" }}
                  onClick={() => setInput({ ...input, stars: index + 1 })}
                />
              ) : (
                <AiOutlineStar
                key={index}
                

                  onMouseOver={() => !input.stars && setCurrent(index + 1)}
                  onMouseLeave={() => setCurrent(undefined)}
                  style={{ color: "orange" }}
                  onClick={() => setInput({ ...input, stars: index + 1 })}
                />
              )
          )}
            </div>
            <div>

        <button
          type="submit"
          value="enviar"
         className="bg-[color:var(--second-bg-color)] px-3 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]  hover:shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] flex align-middle"
        >
          Enviar Comentario
              </button>    

            </div>  
            
            </div>
      </div>
    </form>
    </div>
  );
}
// mx-auto d-flex justify-content-start w-50
export default Review;
