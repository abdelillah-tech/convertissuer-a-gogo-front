const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("token", JSON.stringify(action.payload.data.token));
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.data.token
            };
        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
            };
        case "FILES":
            return {
                ...state,
                filesList: action.payload
            };
        case "CODES":
            return {
                ...state,
                codesList: action.payload
            };
        case "SELECT":
            return {
                ...state,
                selectedFile: action.payload
            };
        case "RESULT_FILE":
            return {
                ...state,
                resultFileKey: action.payload.key,
                resultFileUrl: action.payload.url
            };
        default:
            return state;
    }
};

export default Reducer;