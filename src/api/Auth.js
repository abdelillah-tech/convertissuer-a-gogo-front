import { API_BASE_URL } from '../constants';
import API from './API'

const signup = (name, email, password) => {
    return API
        .post(API_BASE_URL + "/authentication/register/", {
            name: name,
            email: email,
            password: password
        });
}

const login = (email, password) => {
    return API
        .post(API_BASE_URL + "/authentication/login/", {
            email: email,
            password: password
        });

}

export default { login, signup,};