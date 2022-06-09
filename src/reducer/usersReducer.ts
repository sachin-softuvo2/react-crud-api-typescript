import { AnyAction } from "redux";
import { USER_CREATE_FAIL, USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_FETCH_FAIL, USER_FETCH_REQUEST, USER_FETCH_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../actions/usersAction"

type types = {
    users: [],
    loading: boolean,
    message: string
  };

let initialState: types = {
    users: [],
    loading: false,
    message: ''
}

export const usersReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case USER_CREATE_REQUEST:
        case USER_FETCH_REQUEST:
        case USER_UPDATE_REQUEST:
        case USER_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_CREATE_FAIL:
        case USER_UPDATE_FAIL:
        case USER_DELETE_FAIL:
            return {
                ...state,
                loading: false,
            }
        
        case USER_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: ''
            }
        case USER_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.user,
                message: action.payload.user.length < 1 && 'No data found'
            }
        case USER_FETCH_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case USER_UPDATE_SUCCESS:
            let tmpUpdateState = [...state.users] as {}[];
            let updateIndex = tmpUpdateState.findIndex((user: any) => user.userName === action.payload.userName)
            tmpUpdateState[updateIndex] = {
                ...tmpUpdateState[updateIndex],
                lname: action.payload.lName
            }
            return {
                loading: false,
                users: tmpUpdateState
            }
        case USER_DELETE_SUCCESS:
            let tmpDeleteState = [...state.users] as {}[];
            let deleteIndex = tmpDeleteState.findIndex((user: any) => user.userName === action.payload)
            tmpDeleteState.splice(deleteIndex, 1)
            return {
                loading: false,
                users: tmpDeleteState,
                message: tmpDeleteState.length < 1 && 'No data found'
            }

        default: return state
    }
}