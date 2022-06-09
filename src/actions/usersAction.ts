import axios from "axios"
import { API_URL } from "../config/config"

export const USER_CREATE_REQUEST = 'USER_CREATE_REQUEST'
export const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS'
export const USER_CREATE_FAIL = 'USER_CREATE_FAIL'

export const USER_FETCH_REQUEST = 'USER_FETCH_REQUEST'
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS'
export const USER_FETCH_FAIL = 'USER_FETCH_FAIL'

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST'
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS'
export const USER_UPDATE_FAIL = 'USER_UPDATE_FAIL'

export const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST'
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS'
export const USER_DELETE_FAIL = 'USER_DELETE_FAIL'

export const createUser = (firstName: any, lastName: any, userName: any, address: any, contactNumber: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: USER_CREATE_REQUEST
        })

        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let { data } = await axios.get(
            API_URL + `user/enroll?fname=${firstName}&lname=${lastName}&uName=${userName}&address=${address}&contact=${contactNumber}`,
            config
        )
        dispatch({
            type: USER_CREATE_SUCCESS
        })
        alert(data.message)
    }
    catch (err: any) {
        dispatch({
            type: USER_CREATE_FAIL
        })
        alert(err.response.message || 'Something went wrong with request')
    }
}
export const fetchUsers = () => async (dispatch: any) => {
    try {
        dispatch({
            type: USER_FETCH_REQUEST
        })

        const { data } = await axios.get(
            API_URL + `admin/allUser`
        )
        dispatch({
            type: USER_FETCH_SUCCESS,
            payload: data
        })
    }
    catch (err: any) {
        dispatch({
            type: USER_FETCH_FAIL,
            payload: 'No data found'
        })
        if(err.response.message) {
            alert(err.response.message)
        }
    }
}
export const updateUser = (userName: any, lName: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const { data } = await axios.get(
            API_URL + `user/modify?uName=${userName}&field=lname&value=${lName}`
        )
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: {userName, lName}
        })
        alert(data.message)
    }
    catch (err: any) {
        dispatch({
            type: USER_UPDATE_FAIL
        })
        alert(err.response.message || 'Something went wrong with request')
    }
}
export const deleteUser = (userName: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const { data } = await axios.get(
            API_URL + `admin/removeUser?uName=${userName}`
        )
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: userName
        })
        alert(data.message)
    }
    catch (err: any) {
        dispatch({
            type: USER_DELETE_FAIL
        })
        alert(err.response.message || 'Something went wrong with request')
    }
}