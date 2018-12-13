import axios from 'axios'
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'


export const getItems = () => dispatch => {
    dispatch(setItemsLoading());

    axios.get('http://localhost:5000/api/Items').then(res => dispatch({
        type: GET_ITEMS,
        payload: res.data
    }))
}

export const deleteItem = (id) => dispatch =>{
    axios.delete(`http://localhost:5000/api/Items/${id}`)
    .then(res => dispatch({
        type: DELETE_ITEM,
        payload: id
    }))
}

export const addItem = (item) => dispatch => {
    axios.post('http://localhost:5000/api/Items', item)
    .then(res => dispatch({
        type: ADD_ITEM,
        payload: res.data
    }))

}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}
