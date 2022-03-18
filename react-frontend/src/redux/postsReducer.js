import {DELETE, GET_ALL, POST, POSTCOMMENT, VIEW} from "./types";


const initialState = {

    issues: [],
    issue: [],
    comments: []
}
export const postsReducer = (state = initialState, action) => {


    switch (action.type) {
        case POST:
            return {...state, issues: state.issues.concat([action.payload])}

        case VIEW:
            return {...state, issue: action.payload, comments: action.payload.comments}

        case GET_ALL:
            return {...state, issues: action.payload}

        case DELETE:
            return {...state, issues: state.issues.filter(({id}) => id !== action.payload)};


        case POSTCOMMENT: {
            action.payload.date = new Date().toLocaleDateString('es-CL')

            return {...state, comments: state.comments.concat([action.payload])}
        }
        default:
            return state
    }
};



