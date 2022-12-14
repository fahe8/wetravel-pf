import {
  GET_HOTELS,
  GET_DETAIL,
  GET_SEARCH_HOTELS,
  POST_HOTEL,
  LOADING,
  POST_USER,
  GET_SERVICES,
  DELETE_HOTEL,
  POST_RESERVE,
  PAY_RESERVE,
  GET_REVIEW,
  GET_RESERVE,
  GET_RESERVE_USER,
  UPDATE_USER,
  GET_USER,
  GET_RESERVE_BY_CART,
  GET_ID_MERCADO_PAGO,
  POST_REVIEW,
  GET_FAVORITES,
  DELETE_RESERVE,
  GET_IMAGE,
  DETAIL_USER,
  DELETE_REVIEW,
  DELETE_IMAGES,
  BANED,
  POST_ORDER
} from "../action/index";

const initialState = {
  //inicializar el estado; un objeto con varios estados dentro
  hotels: [], //nos devuelve todos los hoteles en un array
  detail: {},
  hotelFilter: [],
  copyHotels: [],
  reserve: [],
  reserveByCart: [],
  service: [],
  review: [],
  users: [],
  userId: {},
  idPay: "",
  loading: false,
  favorites: [],
  images: [],
  reservesUser: [],
  hasMore:true,

};

function rootReducer(state = initialState, action) {
  //function reducer; tiene 2 parámetros (estado inicial, action)

  switch (
    action.type // evalúa el tipo de acción // actions type
  ) {
    case GET_HOTELS: // en el caso de obtener los hoteles necesitamos que se llene el estado que nos devuelve los personajes nuestro payload
      // var setHasMore;
      // if (action.payload !== undefined) {
      //   setHasMore = action.payload.length !== 0 ? true : false;
      // } else {
      //   setHasMore = false;
      // }
      // return {
      //   ...state, //una copia del estado
      //   hotels: state.hasMore !== true ? state.hotels : state.hotels.concat(action.payload), // almacenar en este objeto lo que llega del backend
      //   copyHotels: state.hasMore !== true ? state.hotels : state.hotels.concat(action.payload),
      //   hotelFilter: state.hasMore !== true ? state.hotels : state.hotels.concat(action.payload)
      // };
      return {
        ...state, //una copia del estado
        hotels: action.payload, // almacenar en este objeto lo que llega del backend
        copyHotels: action.payload,
        hotelFilter: action.payload
        // copyHotels: state.hasMore !== true ? state.hotels : state.hotels.concat(action.payload),
        // hotelFilter: state.hasMore !== true ? state.hotels : state.hotels.concat(action.payload)
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
        loading: false,
      };

    case GET_SEARCH_HOTELS:
      return {
        ...state,
        hotels: action.payload,
      };

    case POST_HOTEL:
      return {
        ...state,
        hotels: action.payload,
      };

    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_SERVICES:
      return {
        ...state,
        service: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        users: action.payload,
      };

    case DETAIL_USER:
      return {
        ...state,
        userId: action.payload,
      };

    case POST_USER:
      return {
        ...state,
      };
    case UPDATE_USER:
      return {
        ...state,
      };
    case POST_RESERVE:
      return {
        ...state,
      };
    case PAY_RESERVE:
      return {
        ...state,
      };
    case GET_REVIEW:
      return {
        ...state,
        review: [...action.payload],
      };
    case POST_REVIEW:
      return {
        ...state,
        review: action.payload,
      };
    case DELETE_REVIEW:
      return {
        ...state,
      };
    case DELETE_HOTEL:
      return {
        ...state,
        hotels: [...state.hotels].filter((h) => h.id !== action.payload),
      };

    case GET_RESERVE:
      return {
        ...state,
        reserve: [...action.payload],
      };

    case GET_RESERVE_BY_CART:
      return {
        ...state,
        reserveByCart: [...action.payload],
      };

    case GET_RESERVE_USER:
      return {
        ...state,
        reservesUser: action.payload,
      };

    case GET_ID_MERCADO_PAGO:
      return {
        ...state,
        idPay: action.payload,
      };

    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };

    case DELETE_RESERVE:
      return {
        ...state,
        reserveByCart: [...state.reserveByCart].filter(
          (h) => h.id !== action.payload
        ),
      };
    case GET_IMAGE:
      return {
        ...state,
        images: action.payload,
      };
    case BANED:
      return {
        ...state,
      };
    case DELETE_IMAGES:
      return {
        ...state,
      };

    //  case POST_ORDER: 
    //  return {
    //   ...state
    //  }
    default:
      return state;
  }
}
export default rootReducer;
