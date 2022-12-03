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
  UPDATE_USER,
  GET_USER,
} from "../action/index";

const initialState = {
  //inicializar el estado; un objeto con varios estados dentro
  hotels: [], //nos devuelve todos los hoteles en un array
  detail: {},
  hotelFilter: [],
  copyHotels: [],
  reserve: [],
  service: [],
  review: [],
  users: [],
  loading: false,
};

function rootReducer(state = initialState, action) {
  //function reducer; tiene 2 parámetros (estado inicial, action)

  switch (
    action.type // evalúa el tipo de acción // actions type
  ) {
    case GET_HOTELS: // en el caso de obtener los hoteles necesitamos que se llene el estado que nos devuelve los personajes nuestro payload
      return {
        ...state, //una copia del estado
        hotels: action.payload, // almacenar en este objeto lo que llega del backend
        copyHotels: action.payload,
        hotelFilter: action.payload,
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
      }
    case POST_USER:
      return {
        ...state,
      };
    case UPDATE_USER:
      return {
        ...state,
      }
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
        review: action.payload,
      };

    case DELETE_HOTEL:
      return {
        ...state,
      };

    case GET_RESERVE:
      return {
        ...state,
        reserve: action.payload,
      };
    default:
      return state;
  }
}
export default rootReducer;
