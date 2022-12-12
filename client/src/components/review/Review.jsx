import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { postReview } from "../../redux/action/index";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
function Review({ name }) {
  const [stars, setStars] = useState([1, 2, 3, 4, 5]);
  const [current, setCurrent] = useState(undefined);
  const { user } = useAuth0();
  console.log('USER:', user)
  const [input, setInput] = useState({
    nameUser: user?.name,
    stars: 0,
    comments: [],
    nameHotel: name,
  });
  const dispatch = useDispatch();

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
    toast.error('Es necesario poner una calificación', {
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
    if (input.stars === 0) {
      return messageError();
    } else {
      dispatch(postReview(input));
      setInput({ nameUser: user?.name, stars: 0, comments: [], nameHotel: name, });

      // setInput({ user: client.name, stars: 0, comments: "" });
      setCurrent(0);
      setStars([1, 2, 3, 4, 5]);
      messageOk()
    }
  }
  console.log('INPUT:', input)
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="container ">
        <div className="container d-flex justify-content-center  ">
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

        <br />
        <ToastContainer />
        <FloatingLabel
          name="comments"
          controlId="floatingTextarea"
          label="Comments"
          className="mb-3 d-flex mx-auto form-floating gap-2"
          onChange={(e) => handleChange(e)}
          style={{ height: "100px", width: "600px" }}
        >
          <Form.Control
            as="textarea"
            value={input.comments}
            name="comments"
            placeholder="Leave a comment here"
            style={{ height: "120px" }}
          />
          <div className="mx-auto mt-5 m-1">
            <Button type="submit" value="Enviar" class="btn btn-primary btn-md">
              Enviar
            </Button>
          </div>
        </FloatingLabel>
      </div>
    </form>
  );
}
// mx-auto d-flex justify-content-start w-50
export default Review;
