import axios from 'axios'


export const GET_DETAIL = 'GET_DETAIL'
export const GET_HOTELS = 'GET_HOTELS'
// 1 depachar los hoteles
export const GET_SEARCH_HOTELS = 'GET_SEARCH_HOTELS'

export function getHotels() {
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/hotels');
        return dispatch({
            type: GET_HOTELS,
            payload: json.data
        }) //segunda función que recibe dispatch y despacha una acción / el tipo y el payload: devuelve el backend
    }
}

export function getDetail(id){
    return async function(dispatch){
        const json = await axios(`http://localhost:3001/hotels/${id}`)
        return dispatch ({
            type : GET_DETAIL,
            payload : json.data
        })
    }
    
}

export function getSearchHotels(name) {
    console.log(name)
    return async function (dispatch) {
        const json = await axios.get(`http://localhost:3001/hotels?name=${name}`);
        return dispatch({
            type: GET_SEARCH_HOTELS,
            payload: json.data
        }) //segunda función que recibe dispatch y despacha una acción / el tipo y el payload: devuelve el backend
    }
}
