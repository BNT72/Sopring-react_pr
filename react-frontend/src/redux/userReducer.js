import {GET_USER, GET_USERS, SET_ROLE} from "./types";


const initialState = {

    user: [],
    users: [],

}
export const userReducer = (state = initialState, action) => {


    switch (action.type) {

        case GET_USER:
            return {...state, user: action.payload}
        case GET_USERS:
            return {...state, users: action.payload}
        case SET_ROLE:
            return {...state, user: action.payload}


        default:
            return state
    }
};



