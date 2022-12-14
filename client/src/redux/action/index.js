import axios from "axios";

export const POST_USER = "POST_USER";
export const GET_DETAIL = "GET_DETAIL";
export const GET_HOTELS = "GET_HOTELS";
export const GET_SERVICES = "GET_SERVICES";
export const GET_SEARCH_HOTELS = "GET_SEARCH_HOTELS";
export const POST_HOTEL = "POST_HOTEL";
export const LOADING = "LOADING";
export const POST_RESERVE = "POST_RESERVE";
export const DELETE_HOTEL = "DELETE_HOTEL";
export const PAY_RESERVE = "PAY_RESERVE";
export const GET_REVIEW = "GET_REVIEW";
export const GET_RESERVE = "GET_RESERVE";
export const GET_RESERVE_BY_CART = "GET_RESERVE_BY_CART";
export const POST_ORDER = "POST_ORDER";
export const GET_USER = "GET_USER";
export const DETAIL_USER = "DETAIL_USER";
export const UPDATE_USER = "UPDATE_USER";
export const POST_REVIEW = "POST-REVIEW";
export const GET_FAVORITES = "GET_FAVORITES";
export const GET_ID_MERCADO_PAGO = "GET_ID_MERCADO_PAGO";
export const DELETE_RESERVE = "DELETE_RESERVE";
export const GET_IMAGE = "GET_IMAGE";
export const DELETE_REVIEW = "DELETE_REVIEW";
export const DELETE_IMAGES = "DELETE_IMAGES";
export const GET_RESERVE_USER = "GET_RESERVE_USER";
export const SEND_MAIL = "SEND_MAIL";
export const BANED = "BANED";
export const SEND_MAIL_CREATE = "SEND_MAIL_CREATE";
// 1 depachar los hoteles
export function getHotels(page=0) {
  if(page){
  return async function (dispatch) {
    const json = await axios.get(`http://localhost:3001/hotels`);
    return dispatch({
      type: GET_HOTELS,
      payload: json.data,
    }); //segunda función que recibe dispatch y despacha una acción / el tipo y el payload: devuelve el backend
  };
} else {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/hotels");
    console.log("asd",json.data)
    return dispatch({
      type: GET_HOTELS,
      payload: json.data,
    }); 
  };
}
}


export function getDetail(id) {
  return async function (dispatch) {
    dispatch(loading());
    setTimeout(async () => {
      const json = await axios(`http://localhost:3001/hotels/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: json.data,
      });
    }, 2000);
  };
}

export const loading = () => {
  return {
    type: LOADING,
  };
};

export function getSearchHotels(
  search = "",
  filters = { stars: "", priceMin: "", priceMax: "" }
) {
  // console.log(search);
  return async function (dispatch) {
    //console.log(filters);
    const { stars, priceMin, priceMax } = filters;
    const json = await axios.get(
      `http://localhost:3001/hotels?search=${search}&stars=${stars}&priceMin=${priceMin}&priceMax=${priceMax}`
    );

    return dispatch({
      type: GET_SEARCH_HOTELS,
      payload: json.data,
    }); //segunda función que recibe dispatch y despacha una acción / el tipo y el payload: devuelve el backend
  };
}

export function postHotel(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/hotels", payload);
    return dispatch({
      type: POST_HOTEL,
      payload: response,
    });
  };
}

export function getUser() {
  return async function (dispatch) {
    try {
      const res = await axios("http://localhost:3001/users");
      // console.log('RES GET USER:', res.data);
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(`Error en getUser por: (${error})`);
    }
  };
}

export function getUserById(email) {
  return async function (dispatch) {
    try {
      let res = await axios(`http://localhost:3001/users/${email}`);
      //console.log("RES GET USER BY ID:", res.data);
      dispatch({
        type: DETAIL_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(`Error en GET USER BY ID por: (${error})`);
    }
  };
}

export function postUser(payload) {
  return async function () {
    const response = await axios.post("http://localhost:3001/users", payload);
    return response;
  };
}

export function updateUser(email, status) {
  // console.log('PUT ID:', id);
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `http://localhost:3001/users/${email}`,
        status
      );
      console.log("RES PUT:", response);
      dispatch({
        type: UPDATE_USER,
        payload: response.data,
      });

      dispatch(getUserById(email));
    } catch (error) {
      console.log(
        `No se pudo actualizar la información del Usuario por: (${error})`
      );
    }
  };
}

export function getServices() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/services");
    // console.log(json) //pendiente porque no me está trayendo nada
    return dispatch({
      type: GET_SERVICES,
      payload: json.data,
    }); //segunda función que recibe dispatch y despacha una acción / el tipo y el payload: devuelve el backend
  };
}

export function postReserve(payload) {
  return async function (dispatch) {
    const reserve = await axios.post("http://localhost:3001/reserve", payload);
    return dispatch({
      type: POST_HOTEL,
      payload: reserve,
    });
  };
}

export const payReserve = (payload) => {
  return async function (dispatch) {
    try {
      const pay = await axios.post("http://localhost:3001/mercadopay", payload);
      return dispatch({
        type: PAY_RESERVE,
        payload: pay,
      });
    } catch (error) {
      return error;
    }
  };
};

export function getReview() {
  return async function (dispatch) {
    let reviews = [];
    const res = (await axios.get("http://localhost:3001/review")).data;
    reviews.push(res);
    // console.log("get review", reviews.flat(Infinity));
    return dispatch({
      type: GET_REVIEW,
      payload: reviews.flat(Infinity),
    }); //segunda función que recibe dispatch y despacha una acción / el tipo y el payload: devuelve el backend
  };
}

export function postReview(review) {
  return async function (dispatch) {
    try {
      const response = (
        await axios.post("http://localhost:3001/review", review)
      ).data;
      dispatch(getReview());
      return response;
    } catch (error) {
      console.log(`Error en Action postReview por: (${error})`);
    }
  };
}

export const deleteReview = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3001/review/${id}`);
    dispatch({
      type: DELETE_REVIEW,
    });
  } catch (error) {
    console.log("Error action deleteReview por:", error);
  }
};

export function getReserves(id) {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/reserve/" + id);
    // console.log(json) //pendiente porque no me está trayendo nada
    return dispatch({
      type: GET_RESERVE,
      payload: json.data,
    }); //segunda función que recibe dispatch y despacha una acción / el tipo y el payload: devuelve el backend
  };
}

export function getReservesByCart(user) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        "http://localhost:3001/order/" + user + "/cart"
      );

      // console.log(json) //pendiente porque no me está trayendo nada
      return dispatch({
        type: GET_RESERVE_BY_CART,
        payload: json.data,
      }); //segunda función que recibe dispatch y despacha una acción / el tipo y el payload: devuelve el backend
    } catch (error) {
      return dispatch({
        type: GET_RESERVE_BY_CART,
        payload: [],
      });
    }
  };
}

export function getReservesUser(email) {
  return async function (dispatch) {
    const json = await axios.get(`http://localhost:3001/reserve/${email}`);
    return dispatch({
      type: GET_RESERVE_USER,
      payload: json.data,
    });
  };
}

export function cartReserves(reserva) {  
     return async function(dispatch) {
      const json = await axios.post("http://localhost:3001/order", reserva);
      console.log(json)
      return json
    }

  
}

export function getIdMercadoPago(user) {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/mercadopay/" + user);

    return dispatch({
      type: GET_ID_MERCADO_PAGO,
      payload: json.data,
    });
  };
}

export const postImage = (payload) => async () => {
  try {
    const images = (await axios.post("http://localhost:3001/images", payload))
      .data;
    // console.log('res post:', images)
    return images;
  } catch (error) {
    console.log("Error en postImages por:", error);
  }
};

export const getImage = () => async (dispatch) => {
  try {
    let res = (await axios("http://localhost:3001/images")).data;
    return dispatch({
      type: GET_IMAGE,
      payload: res,
    });
  } catch (error) {
    console.log(`Error en getImg por:`, error);
  }
};

export const deleteImages = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3001/images/${id}`);
    dispatch({
      type: DELETE_REVIEW,
    });
  } catch (error) {
    console.log("Error action deleteReview por:", error);
  }
};

//NO TERMINADA ESTA ACTION

export function deleteReserve(id) {
  return async function (dispatch) {
    const json = await axios.delete("http://localhost:3001/reserve/" + id);
    console.log(json.data);

    return dispatch({
      type: DELETE_RESERVE,
      payload: id,
    });
  };
}

//------->delete dog

export const deleteHotel = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/hotels/${id}`);
      return dispatch({
        type: DELETE_HOTEL,
        payload: id,
      });
    } catch (error) {
      return error;
    }
  };
};

export const getFavorites = (fav) => {
  return { type: GET_FAVORITES, payload: fav };
};

export const updateHotel = (hotel, id) => {
  return async function (dispatch) {
    try {
      const response = (
        await axios.put(`http://localhost:3001/hotels/${id}`, hotel)
      ).data;
      console.log(response);
     // console.log(response);
      dispatch(getHotels())
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendMail = (email) => {
  return async function (dispatch) {
    console.log(email)
    try {
      const response = (
        await axios.post(`http://localhost:3001/send-email`, email)
      ).data;

      return dispatch({
        type: SEND_MAIL,
        payload: "",
      });
    } catch (error) {}
  };
};
export const baned = (payload, id) => {
  console.log("baned", payload, id);
  return async function (dispatch) {
    try {
      const json = (
        await axios.put(`http://localhost:3001/baned/${id}`, payload)
      ).data;
      console.log("json", json);
      dispatch(getUser());
      // return dispatch({
      //   type: BANED,
      //   payload: "",
      // });
    } catch (error) {
      console.log(error);
    }
  }
}

export const sendMailCreate = (email) => {
  return async function (dispatch)  {
    try {
      const response = (
        await axios.post(`http://localhost:3001/send-email-create`, email)
      ).data;

      return dispatch({
        type: SEND_MAIL_CREATE,
        payload: ''
      })
    } catch (error) {
      
    }
  }
}

  

