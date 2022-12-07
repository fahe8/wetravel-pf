import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { postReview } from "../../redux/action/index";

function Review({name}) {
  console.log(name);
  // const client = useSelector((state) => state.users);
  // eslint-disable-next-line no-unused-vars
  const [stars, setStars] = useState([1, 2, 3, 4, 5]);
  const [current, setCurrent] = useState(undefined);
  //  const [description, setDescription] = useState("");
  const [input, setInput] = useState({
    user: "",
    stars: 0,
    comments: "",
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
  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (input.stars === 0) {
      return alert("Es necesario poner una calificación");
    } else {
      dispatch(postReview(input));
      setInput({ user: "", stars: 0, comments: "" });

      // setInput({ user: client.name, stars: 0, comments: "" });
      setCurrent(0);
      setStars([1, 2, 3, 4, 5]);
      alert("gracias por su opiñion");
    }
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="container ">
        <div className="container d-flex justify-content-center  ">
          <h1>{handleClick()}</h1>
          {Array(5)
            .fill()
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
          {/* {stars.map((r, index) => (
            <IoIosStar
              className={r <= current && current}
              key={index}
              name="stars" //No acepta name
              style={{ color: "orange" }}
              value={input.stars}
              onClick={() => handleClick(r)}
            ></IoIosStar>
          ))} */}
        </div>

        <br />
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
