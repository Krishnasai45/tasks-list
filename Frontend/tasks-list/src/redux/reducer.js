const initState = {
    signupMesg : "",
    signupError : null,
    token:"",
    isAuth:false,
    error : null,
    tasks : '',
    userError : null,
    taskDataError : null

}
const saveData=(key, data) =>{
    sessionStorage.setItem(key, JSON.stringify(data));
  }

const reducer = (state = initState, { type, payload }) => {
    switch (type) {
      case "POST_REGISTER_REQUEST":
        return {
          ...state,
          signupError : null
        };
      case "POST_REGISTER_SUCCESS":
        return {
          ...state,
          signupMesg: payload,
        };
      case "POST_REGISTER_FAILURE":
        return {
          ...state,
          signupError: payload,
          signupMesg: "",

        };
      case "POST_LOGIN_REQUEST":
        return {
          ...state,
          isAuth : false
        };
      case "POST_LOGIN_SUCCESS":
        let authToken = payload.authToken;
        saveData("token", authToken);
        return {
          ...state,
          isAuth: true,
          token : payload,
          error : false
        };
      case "POST_LOGIN_FAILURE":
        return {
          ...state,
          isAuth: false,
          token : "",
          error : true
        };
        case "TASKS_LIST_REQUEST":
            return {
              ...state,
              taskDataError : null
            };
          case "TASKS_LIST_SUCCESS":
            return {
              ...state,
              tasks: payload,
            };
          case "TASKS_LIST_FAILURE":
            return {
              ...state,
              taskDataError: payload,
              tasks: "",
    
            };
      default:
        return state;
    }
  };
  export default reducer;