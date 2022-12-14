
const validate = (input) => {
    const regexName = /^[a-zA-Z0-9]/;
    const {
      name,
      stars,
      price,
      photos,
      description,
      room,
      services,
      continent,
      city,
      location,
    } = input;
  
    const numbers = [ price];
    const errors = {};

    //------> Funciones de checkeo <-----------

const checkUndefined = (input) => {
    if (!input.services.length) return true;
    for (let el in input) {
      if (input[el] === undefined) {
        return true;
      }
      return false;
    }
  };
  
  const checkZero = (arr) => {
    return arr.find((el) => Number(el) === 0); //nos comprueba si el número es 0
  };
  
  
  
  const checkNaN = (arr) => {
    return arr.filter((el) => isNaN(Number(el))).length; // comprueba si el valor es NaN
  };
  
  
  
  const checkNegatives = (arr) => {
    return arr.filter((el) => Number(el) < 0).length; // comprueba si el valor es negativo
  };

  
    //check undefined
    if (checkUndefined(input)) {
      errors.allFields = "Todos los campos son requeridos";
    }
  
    //Check contient
    if (!continent) {
      errors.continent = "Selecciona un continente";
    }
  
    //Check city
    if (!city) {
      errors.city = "Ingresa el nombre de la ciudad";
    }
  
    //Check location
    if (!location) {
      errors.location = "Ingresa el nombre del pais";
    }
  
    //check price
    if (!price) {errors.price = "Ingresa un precio valido"} else if(price > 500000){
      errors.price = "El precio deberia ser menor a 500.000"
    }
    
  
    //check description
    if (!description) errors.description = "La descripcion es requerida!";
    if (!room.description) {
      errors.room = {
        ...errors.room,
        description: "La descripcion es requerida!",
      };
    } else if (room.description.length > 100) {
      errors.room = {
        ...errors.room,
        description: "La descripcion es demasido larga",
      };
    }
  
    //Check Services
    if (services.length < 4) {
      errors.services = "Seleccione minimo 4 servicios";
    }

    if (photos.length === 0) {
      errors.photos = "Agregue al menos una imagen";
    }
    if (room.photos.length === 0) {
      errors.room = {
        ...errors.room,
        photos: "Agregue al menos una imagen"
      }
    }
  
    //Check size room
    console.log(room.size)
    if (!room.size) {
      errors.room = { ...errors.room, size: "El tamaño es requerido" };
    } else if (room.size.length > 20) {
      errors.room = { ...errors.room, size: "El tamaño es demasiado largo" };
    }
    //check name
    if (!regexName.test(name)) {
      errors.name = "Nombre incorrecto";
    } else if (name.length < 4) {
      errors.name = "El nombre debe de tener mas de 4 carácteres";
    } else if (name[0] !== name[0].toUpperCase()) {
      errors.name = "El nombre debe iniciar con una letra en mayúscula";
    }
  
    //Check name Room
  
    if (room.name?.length < 4) {
      errors.room = {
        ...errors.room,
        name: "El nombre debe de tener mas de 4 carácteres",
      };
    } else if (room?.name[0] !== room.name[0].toUpperCase()) {
      errors.room = {
        ...errors.room,
        name: "El nombre debe iniciar con una letra en mayúscula",
      };
    } else if (room?.name.length > 80) {
      errors.room = {
        ...errors.room,
        name: "Nombre demasiado largo",
      };
    }
  
    //Check properties room
    console.log(room.properties)
    if (room.properties) {
      let condi = room?.properties?.some(el => el.length > 18 || el.length < 1)
      if(condi) {
        errors.room = {
          ...errors.room,

          properties : "Alguna caracteristica es demasiado larga o solo tiene un caracter"
        }
      }
    }

    if(!stars){
      errors.stars = "No debe estar vacio";
    }else if (stars > 5  || stars < 1) {
      errors.stars = "No puede ser mayor a 5 y menor a 1";
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
  
   

  
    return errors;
  };

  export default validate