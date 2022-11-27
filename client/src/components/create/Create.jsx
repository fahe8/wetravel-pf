import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { postHotel } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillHeart } from "react-icons/ai";
import Stars from '../stars/Stars';


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
        <div className='flex justify-between items-center pl-2.5 m-3.5'>
          <div className='text-lg font-medium text-gray-900  bg-[color:var(--primary-bg-opacity-color)] rounded-full border border-black-800 p-2'>
            <Link to="/home">
              <button>Go Home</button>
            </Link>
          </div>
        </div>
        <hr/>
    <div className=' grid grid-cols-2'>
      <div>
      
        <div >
  
          <div className='py-4 font-medium text-3xl mt-2'>
            <h1>Agrega tu hotel</h1>
          </div>
            <hr/>
              <form  id='form' onSubmit={e => handleSubmit(e)} className='p-6 grid grid-cols-3 mx-8 bg-slate-50 shadow-xl rounded-2xl'>
            <div className='col-span-3 '>
              <input className='w-full bg-transparent border-b border-gray' type="text" value={input.name} name="name"
                placeholder='Hotel Name...' onChange={e => handleChange(e)} />  
              {errors.name && (<p>{errors.name}</p>)}
            </div>
            
            <div className='p-2.5 '>
              <input className=' bg-transparent border-b border-gray w-11/12' type="text" value={input.user} name="user"
                placeholder='Enter user..' onChange={e => handleChange(e)} />
            </div>

            <div className='p-2.5 '>
              <input className='bg-transparent border-b border-gray w-11/12' type="text" value={input.stars} name="stars"
                placeholder='Enter stars..' onChange={e => handleChange(e)} />
              {errors.stars && (<p>{errors.stars}</p>)}
            </div>
            
            <div className='p-2.5'>
              <input className='bg-transparent border-b border-gray w-11/12' type="text" value={input.price} name="price"
                placeholder='$' onChange={e => handleChange(e)} />
              {errors.price && (<p>{errors.price}</p>)}
            </div>

             <div className='p-2.5'>
              <input className='bg-transparent border-b border-gray w-11/12' type="text" value={input.continent} name="continent"
                placeholder='Enter continent..' onChange={e => handleChange(e)} />
            </div> 

            <div className='p-2.5'>
              <input className='bg-transparent border-b border-gray w-11/12' type="text" value={input.location} name="location"
                placeholder='Enter location..' onChange={e => handleChange(e)} />
            </div>

            <div className='p-2.5 '>
              <input className='bg-transparent border-b border-gray w-11/12' type="text" value={input.city} name="city"
                placeholder='Enter city..' onChange={e => handleChange(e)} />
            </div>

            <div className=' col-span-3 p-2.5' >
              <input className='bg-transparent border-b border-gray w-full h-auto' type="text" value={input.description} name="description"
                placeholder='Add description..' onChange={e => handleChange(e)} />
              {errors.description && (<p>{errors.description}</p>)}
            </div>

            <div className='col-span-3 p-2.5'>
              <input className='bg-transparent border-b border-gray w-full' type="text" value={input.services} name="services"
                placeholder='Enter services..' onChange={e => handleChange(e)} />
            </div>
            <div className='col-span-3 p-2.5'>
              <input className= 'bg-transparent border-b border-gray w-full'  type="text" value={input.photos} name="photos"
                placeholder='Url photos..' onChange={e => handleChange(e)} />
            </div>
           
            <div className='col-span-3 p-2.5'>
              <input className='bg-transparent border-b border-gray w-full' type="text" value={input.review} name="review"
                placeholder='Enter review..' onChange={e => handleChange(e)} />
            </div>

            <div className='col-span-3 p-2.5'>
              <input className='bg-transparent border-b border-gray w-full' type="text" value={input.comments} name="comments"
                placeholder='Enter comments..' onChange={e => handleChange(e)} />
            </div>
            
            <div className ='text-lg font-medium text-gray-900  bg-[color:var(--primary-bg-opacity-color)] rounded-full border border-black-800 p-2 '>
              <button className='cursor-pointer' disabled={button} type="submit" form='form'>Agregar</button>
            </div>
          </form>
        </div>

      </div>
      
      <div>
        <div >

          <div className='py-4 font-medium text-3xl mt-2'>
            <h1>Así se verá tu hotel en el home !</h1>
            </div>
            <hr/>
          
          <div className=" m-auto bg-white hover:bg-gray-200 shadow-xl hover:shadow-none w-80 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out">
            <div className='relative mt-2 mx-2' >
              <div className="object-cover w-full h-full">
                <img className='rounded-2xl' src={input.photos.length ?
                  input.fotos
                : "https://www.hmplayadelcarmen.com/wp-content/uploads/1739/1694/nggallery/home//02-HM-Playa-del-Carmen-mobile.jpg"} alt="Hotel image" />
              </div>

              <div className="h-10 w-10 flex items-center justify-center text-xl bg-white hover:bg-red-500 text-red-500 hover:text-white rounded-2xl shadow-xl transform-gpu translate-y-0 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                <AiFillHeart />
              </div>
              
              <div >
                {input.stars.length > 0 ? 
                  <h3> <Stars stars={input.stars} /></h3>
                  : <h3 className='text-slate-300'>0</h3>}
              </div>

              <hr/>

              <div className='text-left'>
                {input.name.length > 4 ?
                  <h1>{input.name}</h1>
                  : <h1 className='text-slate-300' > Hotel name</h1>} 
              </div>

              <br/>

              <div className='text-left' >
                {input.location.length > 3 ?
                  <h3>{input.location}, {input.city}</h3>
                  : <h3 className='text-slate-300' >location, city</h3>} 
              </div>
              <div className='text-left'>
                {input.price.length > 2 ?
                  <h3>${input.price} night</h3>
                  : <h3 className='text-slate-300'> price for night</h3>}
              </div>
              <br/>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
  )
}

export default Create
