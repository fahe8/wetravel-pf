import axios from 'axios'

// 1 depachar los hoteles

export function getHotels() {
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/hotels');
        return dispatch({
            type: 'GET_HOTELS',
            payload: json.data
        }) //segunda función que recibe dispatch y despacha una acción / el tipo y el payload: devuelve el backend
    }
}

export function getDetail(id) {
    console.log(id)
    return async function (dispatch) {
        const json = await axios.get(`http://localhost:3001/hotels/${id}`)
        return dispatch({
            type: 'GET_DETAIL',
            payload: json.data
            
        })
    }
}