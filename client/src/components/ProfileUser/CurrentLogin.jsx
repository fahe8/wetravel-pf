import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/action";

export const CurrentLogin = (props) => {
  let { id } = props.match.params;
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userId);
  console.log('USER ID:', userId)

  const initialState = {
    name: "",
    email: "",
    email_verified: false,
    status: "",
    photos: [],
  };

  const [input, setInput] = useState(initialState);

  useEffect(() => {
    dispatch(updateUser(id));
  }, [dispatch, id]);

  const handleSutmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(id));
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Actualiza el estado de tu usuario</h1>
      <form onSubmit={handleSutmit}>
        {/* <label>Nombre:</label>
        <input
          type="text"
          value={input.name}
          placeholder="User name"
          onChange={(e) => handleChange(e)}
        /> */}
        <label>Estado:</label>
        <input
          type="text"
          value={input.status}
          placeholder="User status"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit" >Actualizar</button>
      </form>
    </div>
  );
};
