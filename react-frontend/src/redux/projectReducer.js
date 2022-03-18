import {GET_ALL_PROJECT, POST_PROJECT} from "./types";


const initialState = {

    projects: [],
    project: []
}
export const projectReducer = (state = initialState, action) => {


    switch (action.type) {
        case POST_PROJECT:
            return {...state, projects: state.projects.concat([action.payload])}

        case GET_ALL_PROJECT:
            return {...state, projects: action.payload}

        default:
            return state
    }
};



