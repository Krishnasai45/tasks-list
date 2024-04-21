import axios from "axios";
const POST_REGISTER_FAILURE = "POST_REGISTER_FAILURE"
const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS"
const POST_REGISTER_REQUEST = "POST_REGISTER_REQUEST"
const POST_LOGIN_FAILURE = "POST_LOGIN_FAILURE"
const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS"
const POST_LOGIN_REQUEST = "POST_LOGIN_REQUEST"

const TASKS_LIST_FAILURE = "TASKS_LIST_FAILURE"
const TASKS_LIST_SUCCESS = "TASKS_LIST_SUCCESS"
const TASKS_LIST_REQUEST = "TASKS_LIST_REQUEST"





export const postRegisterRequest = () => ({
    type: POST_REGISTER_REQUEST,
});
export const postRegisterSuccess = (payload) => ({
    type: POST_REGISTER_SUCCESS,
    payload,
});
export const postRegisterfailure = (payload) => ({
    type: POST_REGISTER_FAILURE,
    payload,
});

export const postUsersData = (payload) => (dispatch) => {


    dispatch(postRegisterRequest());
    return axios({
        method: "POST",
        url: "http://localhost:3001/register",
        data: {
            name: payload.name,
            email: payload.email,
            password: payload.pass,
        },
    })
        .then((res) => dispatch(postRegisterSuccess(res.data)))
        .catch((err) => dispatch(postRegisterfailure(err.response)));
};

export const postLoginRequest = () => ({
    type: POST_LOGIN_REQUEST,
});
export const postLoginSuccess = (payload) => ({
    type: POST_LOGIN_SUCCESS,
    payload,
});
export const postLoginfailure = (payload) => ({
    type: POST_LOGIN_FAILURE,
    payload,
});

export const postLoginData = (payload) => (dispatch) => {


    dispatch(postLoginRequest());
    return axios({
        method: "POST",
        url: "http://localhost:3001/login",
        data: {
            email: payload.email,
            password: payload.pass,
        },
    })
        .then((res) => dispatch(postLoginSuccess(res.data)))
        .catch((err) => dispatch(postLoginfailure(err)));
};



export const tasksListRequest = () => ({
    type: TASKS_LIST_REQUEST,
});
export const tasksListSuccess = (payload) => ({
    type: TASKS_LIST_SUCCESS,
    payload,
});
export const tasksListfailure = (payload) => ({
    type: TASKS_LIST_FAILURE,
    payload,
});

export const taskListData = (payload) => (dispatch) => {

    const tokenFromStorage = sessionStorage.getItem("token");
    const tokenWithoutPadding = tokenFromStorage.slice(1, -1);
    dispatch(tasksListRequest());
    return axios({
        method: "GET",
        url: "http://localhost:3001/allList",
        headers: {
            "Authorization": "Bearer " + tokenWithoutPadding
        },
    })
        .then((res) => dispatch(tasksListSuccess(res.data.tasks)))
        .catch((err) => dispatch(tasksListfailure(err)));
};
