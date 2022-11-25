import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { postHotel } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';


const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [button, setButton] = useState(true);

  const [ input, setInput ] = useState({
    name: "",
    description: "",
    stars: "",
    
  });

  useEffect(() => {
    if(input.name.length>0) setButton(false);
    else setButton(true);
  }, [input, setButton]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postHotel(input));
    alert("New Hotel created succesfully!");
    setInput({
      name: ""
    });
    history.push("/home");
  }

  return (
    <div>
      <Link to="/home">
        <button>Go Home</button>
      </Link>
      <h1>Create your Hotel !</h1>

      <form id='form' onSubmit={e => handleSubmit(e)}>
        <div>
          <input type="text" value={input.name} name="name"
          placeholder='Hotel Name...' onChange={e => handleChange(e)}/>
        </div>

        <div>
          <button disabled={button} type="submit" form='form'>Create Hotel</button>
        </div>

      </form>

    </div>
  )
}

export default Create
