import API from './API'

const signup = (name, email, password) => {
    return API
        .post("/authentication/register/", {
            name: name,
            email: email,
            password: password
        });
}

const login = (email, password) => {
    return API
        .post("/authentication/login/", {
            email: email,
            password: password
        });

}

export default { login, signup,};