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
        case "CHARGEFILE":
            return {
                ...state,
                selectedFile: action.payload
            };
        case "CHARGESERVERFILE":
            return {
                ...state,
                serverFileName: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;