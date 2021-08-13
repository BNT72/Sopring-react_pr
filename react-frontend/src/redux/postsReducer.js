import {DELETE, GET_ALL, POST, POSTCOMMENT, VIEW} from "./types";


const initialState = {

    employees: [],
    employee: [],
    comments: []
}
export const postsReducer = (state = initialState, action) => {


    switch (action.type) {
        case POST:
            return {...state, employees: state.employees.concat([action.payload])}

        case VIEW:
            return {...state, employee: action.payload, comments: action.payload.comments}

        case GET_ALL:
            return {...state, employees: action.payload}

        case DELETE:
            return {...state, employees: state.employees.filter(({id}) => id !== action.payload)};


        // case UPDATE :
        //         //return {...state,employees: state.employees.map((post))}
        //         return {...state,employees:state.employees.map((employee)=>{
        //
        //                 if(employee.id == action.payload) {
        //                     console.log( employee.id)
        //                     console.log( action.payload)
        //                     return {
        //                       ...action.data
        //                     }
        //                 } else return employee;
        //             })}

        case POSTCOMMENT: {
            action.payload.date = new Date().toLocaleDateString('es-CL')

            return {...state, comments: state.comments.concat([action.payload])}
        }
        default:
            return state
    }
};



