import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/action";

export const CurrentLogin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUser());
  }, [dispatch]);

  const handleSutmit = () => {
    // if () {}
  }

  return (
    <div>
      <form>
        <label>Nombre:</label>
        <input />
      </form>
    </div>
  );
}