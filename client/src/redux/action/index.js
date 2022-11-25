import axios from 'axios'

export const POST_USER = "POST_USER"
export const GET_DETAIL = 'GET_DETAIL'
export const GET_HOTELS = 'GET_HOTELS'
// 1 depachar los hoteles
export const GET_SEARCH_HOTELS = 'GET_SEARCH_HOTELS'
export const POST_HOTEL = 'POST_HOTEL'
export const LOADING = "LOADING"

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
            dispatch(loading());
            setTimeout(async () => {
            const json = await axios(`http://localhost:3001/hotels/${id}`)
            return dispatch ({
                type : GET_DETAIL,
                payload : json.data
            })
        }, 2000)
    }   
}

export const loading = () => {
    return {
        type: LOADING,
    }
}

export function getSearchHotels(search, from) {
    console.log(search)
    return async function (dispatch) {
        const json = await axios.get(`http://localhost:3001/hotels?${from === 'location'?`location=${search}`: `continent=${search}`}`);
        return dispatch({
            type: GET_SEARCH_HOTELS,
            payload: json.data
        }) //segunda función que recibe dispatch y despacha una acción / el tipo y el payload: devuelve el backend
    }
}


export function postHotel(payload){
    return async function(dispatch){
        const response = await axios.post('http://localhost:3001/hotels', payload);
        return dispatch({
            type: POST_HOTEL,
            payload: response
        })
    }
}

export function postUser(payload){
    return async function(){
        const response = await axios.post("http://localhost:3001/users", payload)
        return response;
    }
}