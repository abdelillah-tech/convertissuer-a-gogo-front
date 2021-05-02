import { API_BASE_URL } from '../constants';
import axios from 'axios';

const signup = (name, email, password) => {
    return axios
        .post(API_BASE_URL + "/authentication/register/", {
            name: name,
            email: email,
            password: password
        });
}

const login = (email, password) => {
    return axios
        .post(API_BASE_URL + "/authentication/login/", {
            email: email,
            password: password
        });

}

export default { login, signup,};