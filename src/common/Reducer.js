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
        case "SELECT":
            console.log(action.payload)
            return {
                ...state,
                selectedFile: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;