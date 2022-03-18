import {
    DELETE,
    GET_ALL,
    GET_ALL_PROJECT,
    GET_USER,
    GET_USERS,
    POST,
    POST_PROJECT,
    POSTCOMMENT,
    SET_ROLE,
    VIEW
} from "./types";
import axios from "axios";
import {reset} from "redux-form";

const ISSUE_API_BASE_URL = "/api/issues"
const PROJECT_API_BASE_URL = "/api/projects"


export const createIssue = (issue) => async (dispatch) => {
    try {
        console.log(issue)
        await axios.post(ISSUE_API_BASE_URL, issue);
        await dispatch({
            type: POST,
            payload: issue,
        });
    } catch (err) {
        console.log(err);
    }
};

export const createProject = (project) => async (dispatch) => {
    try {
        console.log("pr  "+project)
        const res= await axios.post(PROJECT_API_BASE_URL, project);
        await dispatch({
            type: POST_PROJECT,
            payload: res,
        });
    } catch (err) {
        console.log(err);
    }
};


export const fetchPosts = () => async (dispatch) => {
    try {
        const res = await axios.get(ISSUE_API_BASE_URL);


        await dispatch({
            type: GET_ALL,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const fetchProjects = () => async (dispatch) => {
    try {
        const res = await axios.get(PROJECT_API_BASE_URL);


        await dispatch({
            type: GET_ALL_PROJECT,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};


export const deleteIssue = (id) => async (dispatch) => {

    try {
        await axios.delete(ISSUE_API_BASE_URL + "/" + id);

        await dispatch({
            type: DELETE,
            payload: id
        });
    } catch (err) {
        console.log(err);
    }


}


export const ViewIssue = (id) => async (dispatch) => {

    const res = await axios.get(ISSUE_API_BASE_URL + "/" + id);

    await dispatch({
        type: VIEW,
        payload: res.data
    });



}

export const SaveComment = (id, comment) => async (dispatch) => {
    await axios.post(ISSUE_API_BASE_URL + "/" + id, comment);


    dispatch(reset('Comment'));
    comment.id = 0;
    dispatch({
        type: POSTCOMMENT,
        payload: comment
    });

}

export const GetUser = () => async (dispatch) => {
   let user=[]
       user= await axios.get("/usr");


    await dispatch({
        type: GET_USER,
        payload: user.data
    })
}
export const GetUsers = () => async (dispatch) => {
    const user = await axios.get("/usrs");
    if(user.length!==0){
    await dispatch({
        type: GET_USERS,
        payload: user.data
    }) }
}
export const SetRole = (user) => async (dispatch) => {

    const usr = await axios.post("/usr",user);


    await dispatch({
        type: SET_ROLE,
        payload: usr.data
    });
}

