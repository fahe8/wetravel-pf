import {GET_HOTELS,GET_DETAIL, GET_SEARCH_HOTELS} from '../action/index'


const initialState = { //inicializar el estado; un objeto con varios estados dentro
    hotels: [], //nos devuelve todos los hoteles en un array
    detail: {}
}


function rootReducer(state = initialState, action) { //function reducer; tiene 2 parámetros (estado inicial, action)
    
    switch (action.type) { // evalúa el tipo de acción // actions type
        case GET_HOTELS : // en el caso de obtener los hoteles necesitamos que se llene el estado que nos devuelve los personajes nuestro payload
            return {
                ...state, //una copia del estado
                hotels: action.payload // almacenar en este objeto lo que llega del backend
            }
        case GET_DETAIL:
            return {
                ...state,
                detail : action.payload
            }

        case GET_SEARCH_HOTELS:
            return {
                ...state,
                hotels: action.payload
            }
        default:
            return state
    }
}
export default rootReducer;