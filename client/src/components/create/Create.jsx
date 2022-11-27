import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { postHotel, getHotels, getServices } from '../../redux/action';
import { AiFillHeart } from "react-icons/ai";
import Stars from '../stars/Stars';


//------> Funciones de checkeo <-----------

const checkUndefined = (input) => {
  if (!input.services.length) return true;
  for (let el in input) {
    if (input[el] === undefined) {
      return true;
    } 
    return false
  }
}

const checkZero = (arr) => {
  return arr.find((el) => Number(el) === 0); //nos comprueba si el número es 0
};

// const checkLimit = (arr, limit) => {
//   return arr.filter((el) = el > limit).length; // nos comprueba si el valor es mayor que el límite 
// };

const checkNaN = (arr) => {
  return arr.filter((el) => isNaN(Number(el))).length; // comprueba si el valor es NaN
};

const checkMinMax = (min, max) => {
  const nMax = Number(max);
  const nMin = Number(min);
  if (nMin > nMax || nMin === nMax) return false; // comprueba si el valor es menor o mayor
  return true
};

const checkNegatives = (arr) => {
  return arr.filter((el) => Number(el) < 0).length; // comprueba si el valor es negativo
};

//--------> Función de validación <--------

const validate = (input) => {
  const regexUrl = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;
  const regexName = /^[a-zA-Z ]+$/;
  const {
    name,
    stars,
    price,
    photos,
    description
  } = input;

  const numbers = [stars, price];
  const errors = {};

  //check undefined 
  if (checkUndefined(input)) {
    errors.allFields = "Todos los campos son requeridos"
  }

  //check price
  if (!price) errors.price = "Enter a valid price";
  
  //check description
  if(!description) errors.description = "Description is required !";

  //check name 
  if (!regexName.test(name)) {
    errors.name = "Nombre incorrecto";
  } else if (name.length < 4) {
    errors.name = "El nombre debe de tener mas de 4 carácteres"
  } else if (name[0] !== name[0].toUpperCase()) {
    errors.name = "El nombre debe iniciar con una letra en mayúscula";
  }

  //check negatives 
  if (checkNegatives(numbers)) {
    errors.negatives = "No se permitén agregar números negativos";
  } 

  // check number type
  else if (checkNaN(numbers)) {
    errors.nan = "El valor ingresado debe ser un número";
  }

  //check number 0
  if (checkZero(numbers)) {
    errors.zero = "El valor igresado debe ser mayor a 0"; 
  }

  if (stars > 5) {
    errors.max = "No puede agregar más de 5"
  }

  if (input.photos && !regexUrl.test(photos)) {
    errors.url = "Inserte unicamente url que terminen en: jpeg, jpg o png";
  }

  return errors;
}

const Create = () => {

  const dispatch = useDispatch();
  //const navigate = useNavigate();
  const history = useHistory();
  const { service, hotelFilter } = useSelector((state) => state);

  const initialState = {
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
  };

  const [errors, setErrors] = useState({
    allFields: "All fields are required",
  });

  const [input, setInput] = useState(initialState);

  useEffect(() => {
    dispatch(getServices());
    dispatch(getHotels())
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      services: input.services.filter((c) => c !== e.target.name),
    });
  };

  const handleSelect = (e) => {
    const { value } = e.target;
    if (input.services.includes(value))
      return alert("Ya ha seleccionado esos servicios");
    if (input.services.length < 15) {
      setInput({
        ...input,
        services: [...input.services, value],
      });
      setErrors(
        validate({
          ...input,
          services: [...input.services, value],
        })
      );
    } else alert("Has alcanzado la cantidad máxima de servicios");
  };

  const handleSubmit = (e) => {
    const namefilterd = hotelFilter.filter((el) => el.name === input.name);
    if (namefilterd.length) {
        e.preventDefault();
        alert("No puede usar un nombre existente");
    } else {
    e.preventDefault();
    dispatch(postHotel(input));
    console.log(input);
    alert("Felicidades el hotel ha sido creado con éxito");
    setInput(initialState);
    history.push("/home")
    }
  };



// function validate(input){
//   let errors = {};
//   if(!input.name) errors.name = "Name is required !";
//   if(!input.description) errors.description = "Description is required !";
//   if(input.stars > 5 || input.stars < 0) errors.stars = "Stars could be just 1 to 5";
//   if(!input.price) errors.price = "Enter a valid price";

//   return errors;
// }

// const Create = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const [button, setButton] = useState(true);
//   const [errors, setErrors] = useState({}); 

//   const [ input, setInput ] = useState({
//     name: "",
//     description: "",
//     stars: "",
//     price: "",
//     services: [],
//     photos: [],
//     continent: "",
//     location: "",
//     city: "",
//     review: "",
//     comments: [],
//     user: ""
//   });

//   useEffect(() => {
//     if(input.name.length>0 && input.description.length>0 && input.stars && input.price && input.services.length && input.photos.length && input.continent.length>0 && input.location.length>0 && input.city.length>0 && input.user) setButton(false);
//     else setButton(true);
//   }, [input, setButton]);

//   const handleChange = (e) => {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value
//     });
//     setErrors(validate({
//       ...input,
//       [e.target.name]: e.target.value
//     }));
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(postHotel(input));
//     alert("New Hotel created succesfully!");
//     setInput({
//       name: "",
//       description: "",
//       stars: "",
//       price: "",
//       services: [],
//       photos: [],
//       continent: "",
//       location: "",
//       city: "",
//       review: "",
//       comments: [],
//       user: ""
//     });
//     history.push("/home");
//   }

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
            <hr />
            
            <form onSubmit={e => handleSubmit(e)} className='p-6 grid grid-cols-3 mx-8 bg-slate-50 shadow-xl rounded-2xl'>
             
              <div className='col-span-3 '>  
                <input
                  className='w-full bg-transparent border-b border-gray'
                  id="name input"
                  type="text"
                  value={input.name}
                  name="name"
                  placeholder='Hotel Name...'
                  onChange={e => handleChange(e)}
                />  
                {errors.name && (<p>{errors.name}</p>)}
            </div>
            
            <div className='p-2.5 '>
                <input
                  className='bg-transparent border-b border-gray w-11/12'
                  type="text"
                  value={input.user}
                  name="user"
                  placeholder='Enter user..'
                  onChange={e => handleChange(e)} />
            </div>

            <div className='p-2.5 '>
                <input
                  className='bg-transparent border-b border-gray w-11/12'
                  id='starsInput'
                  type="text"
                  value={input.stars}
                  name="stars"
                  placeholder='Enter stars..'
                  onChange={e => handleChange(e)}
                />
                {errors.stars && (<p>{errors.stars}</p>)}
                {errors.max && (<p>{errors.max}</p>)}
                {errors.negatives && (<p>{errors.negatives}</p>)}
                {errors.nan && <p >{errors.nan} </p>}
                {errors.zero && <p>{errors.zero} </p>}
              </div>
            
            <div className='p-2.5'>
                <input
                  className='bg-transparent border-b border-gray w-11/12'
                  type="number"
                  value={input.price}
                  name="price"
                  placeholder='$' onChange={e => handleChange(e)} />
                
                {errors.price && (<p>{errors.price}</p>)}
                {errors.negatives && (<p>{errors.negatives}</p>)}
                {errors.nan && <p >{errors.nan} </p>}
                {errors.zero && <p>{errors.zero} </p>}
            </div>

             <div className='p-2.5'>
                <input
                  className='bg-transparent border-b border-gray w-11/12'
                  type="text"
                  value={input.continent}
                  name="continent"
                  placeholder='Enter continent..'
                  onChange={e => handleChange(e)} />
            </div> 

            <div className='p-2.5'>
                <input
                  className='bg-transparent border-b border-gray w-11/12'
                  type="text"
                  value={input.location}
                  name="location"
                  placeholder='Enter location..'
                  onChange={e => handleChange(e)} />
            </div>

            <div className='p-2.5 '>
                <input className='bg-transparent border-b border-gray w-11/12'
                  type="text" value={input.city}
                  name="city"
                  placeholder='Enter city..'
                  onChange={e => handleChange(e)} />
            </div>

            <div className=' col-span-3 p-2.5' >
                <input
                  className='bg-transparent border-b border-gray w-full h-auto'
                  type="text"
                  value={input.description}
                  name="description"
                  placeholder='Add description..'
                  onChange={e => handleChange(e)} />
                {errors.description && (<p>{errors.description}</p>)}
              </div>

              <div className='col-span-3 p-2.5'>
                <select
                  className='bg-transparent border-b border-gray w-full'
                  id="tempsInput"
                  onChange={handleSelect}>
                  {!input.services.length ? (
                    <option>Select services</option>
                  ) : (
                      <option disabled={true}>Select Temperament</option>
                  )}
                  {service.map((serv) => {
                    return (
                      <option key={serv} value={serv}>
                        {serv}{" "}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className='col-span-3 p-2.5'>
                <input
                  className='bg-transparent border-b border-gray w-full'
                  id='photoInput'
                  type="text"
                  value={input.photos}
                  name="photos"
                  placeholder='Url photos..'
                  onChange={e => handleChange(e)} />
                {errors.url && <p>{errors.url} </p>}
              </div>
            
              <div className='col-span-3 p-2.5'>
                <input
                  className='bg-transparent border-b border-gray w-full'
                  type="text" value={input.review}
                  name="review"
                  placeholder='Enter review..'
                  onChange={e => handleChange(e)}
                />
              </div>
              

            <div className='col-span-3 p-2.5'>
                <input
                  className='bg-transparent border-b border-gray w-full'
                  type="text"
                  value={input.comments}
                  name="comments"
                  placeholder='Enter comments..'
                  onChange={e => handleChange(e)} />
              </div>

              {Object.keys(errors).length ? (
                <div className='text-lg font-medium text-gray-900  bg-[color:var(--primary-bg-opacity-color)] rounded-full border border-black-800 p-2 '>
                  <button className='cursor-pointer' type="submit" form='form'>Agregar</button>
                </div>
              ) : (
                  <div className='text-lg font-medium text-gray-900  bg-[color:var(--primary-bg-opacity-color)] rounded-full border border-black-800 p-2 '>
                    <button className='cursor-pointer'  type="submit" form='form'>Agregar</button>
                  </div>
              )}
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
                : "https://www.hmplayadelcarmen.com/wp-content/uploads/1739/1694/nggallery/home//02-HM-Playa-del-Carmen-mobile.jpg"} alt="Hotel" />
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
                <div>
                  {input.services.map((services) => (
                    <p key={services}>{services}</p>
                  ))}
                </div>
                <div >
                  {input.services.map((serv) => (
                    <div key={serv}>
                      <button name={serv} onClick={handleDelete}>
                        X
                      </button>
                      <p>{serv}</p>
                    </div>
                  ))}
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