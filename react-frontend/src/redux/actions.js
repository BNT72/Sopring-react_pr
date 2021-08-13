import {DELETE, GET_ALL, GET_USER, POST, POSTCOMMENT, VIEW} from "./types";
import axios from "axios";
import {reset} from "redux-form";

const EMPLOYEE_API_BASE_URL = "/api/employees"


export const createIssue = (issue) => async (dispatch) => {
    try {
        await axios.post(EMPLOYEE_API_BASE_URL, issue);
        issue.id = 0;
        await dispatch({
            type: POST,
            payload: issue,
        });
    } catch (err) {
        console.log(err);
    }
};

export const fetchPosts = () => async (dispatch) => {
    try {
        const res = await axios.get(EMPLOYEE_API_BASE_URL);


        await dispatch({
            type: GET_ALL,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};


export const deleteIssue = (id) => async (dispatch) => {

    try {
        await axios.delete(EMPLOYEE_API_BASE_URL + "/" + id);

        await dispatch({
            type: DELETE,
            payload: id
        });
    } catch (err) {
        console.log(err);
    }


}


export const ViewIssue = (id) => async (dispatch) => {

    const res = await axios.get(EMPLOYEE_API_BASE_URL + "/" + id);

    await dispatch({
        type: VIEW,
        payload: res.data
    });



}

export const SaveComment = (id, comment) => async (dispatch) => {
    await axios.post(EMPLOYEE_API_BASE_URL + "/" + id, comment);


    dispatch(reset('Comment'));
    comment.id = 0;
    dispatch({
        type: POSTCOMMENT,
        payload: comment
    });

}

export const GetUser = () => async (dispatch) => {
    const user = await axios.get("/usr");


    await dispatch({
        type: GET_USER,
        payload: user.data
    });
}


// export const updateIssue = (id, data) => async (dispatch) => {
//     try {
//
//         const res = await  axios.put(EMPLOYEE_API_BASE_URL + "/" + id, data)
//
//
//         await  dispatch({
//             type: UPDATE,
//             payload: id, data
//         });
//
//         return Promise.resolve(res.data);
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };