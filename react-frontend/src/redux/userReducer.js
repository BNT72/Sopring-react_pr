import {GET_USER, SET_ROLE} from "./types";


const initialState = {

    user: [],

}
export const userReducer = (state = initialState, action) => {


    switch (action.type) {

        case GET_USER:
            return {...state, user: action.payload}
        case SET_ROLE:
            return {...state, user: action.payload}


        default:
            return state
    }
};



