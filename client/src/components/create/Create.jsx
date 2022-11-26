import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { postHotel } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';

function validate(input){
  let errors = {};
  if(!input.name) errors.name = "Name is required !";
  if(!input.description) errors.description = "Description is required !";
  if(input.stars > 5 || input.stars < 0) errors.stars = "Stars could be just 1 to 5";
  if(!input.price) errors.price = "Enter a valid price";

  return errors;
}

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [button, setButton] = useState(true);
  const [errors, setErrors] = useState({}); 

  const [ input, setInput ] = useState({
    name: "",
    description: "",
    stars: "",
    price: "",
    services: [],
    photos: [],
    continent: "",
    location: "",
    city: "",
    review: "",
    comments: [],
    user: ""
  });

  useEffect(() => {
    if(input.name.length>0 && input.description.length>0 && input.stars && input.price && input.services.length && input.photos.length && input.continent.length>0 && input.location.length>0 && input.city.length>0 && input.user) setButton(false);
    else setButton(true);
  }, [input, setButton]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postHotel(input));
    alert("New Hotel created succesfully!");
    setInput({
      name: "",
      description: "",
      stars: "",
      price: "",
      services: [],
      photos: [],
      continent: "",
      location: "",
      city: "",
      review: "",
      comments: [],
      user: ""
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
          {errors.name && (<p>{errors.name}</p>)}
        </div>

        <div>
          <input type="text" value={input.description} name="description"
          placeholder='Add description..' onChange={e => handleChange(e)}/>
        </div>
        <div>
          {errors.description && (<p>{errors.description}</p>)}
        </div>

        <div>
          <input type="text" value={input.stars} name="stars"
          placeholder='Enter stars..' onChange={e => handleChange(e)}/>
        </div>
        <div>
          {errors.stars && (<p>{errors.stars}</p>)}
        </div>

        <div>
          <input type="text" value={input.price} name="price"
          placeholder='$' onChange={e => handleChange(e)}/>
        </div>
        <div>
          {errors.price && (<p>{errors.price}</p>)}
        </div>

        <div>
          <input type="text" value={input.services} name="services"
          placeholder='Enter services..' onChange={e => handleChange(e)}/>
        </div>

        <div>
          <input type="text" value={input.photos} name="photos"
          placeholder='Url photos..' onChange={e => handleChange(e)}/>
        </div>

        <div>
          <input type="text" value={input.continent} name="continent"
          placeholder='Enter continent..' onChange={e => handleChange(e)}/>
        </div>

        <div>
          <input type="text" value={input.location} name="location"
          placeholder='Enter location..' onChange={e => handleChange(e)}/>
        </div>

        <div>
          <input type="text" value={input.city} name="city"
          placeholder='Enter city..' onChange={e => handleChange(e)}/>
        </div>

        <div>
          <input type="text" value={input.review} name="review"
          placeholder='Enter review..' onChange={e => handleChange(e)}/>
        </div>

        <div>
          <input type="text" value={input.comments} name="comments"
          placeholder='Enter comments..' onChange={e => handleChange(e)}/>
        </div>

        <div>
          <input type="text" value={input.user} name="user"
          placeholder='Enter user..' onChange={e => handleChange(e)}/>
        </div>

        <div>
          <button disabled={button} type="submit" form='form'>Create Hotel</button>
        </div>

      </form>

    </div>
  )
}

export default Create
