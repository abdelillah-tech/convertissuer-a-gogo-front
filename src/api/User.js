import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import API from './API'

const getCurrentUser = () => {
    return API
        .get(API_BASE_URL + "/user/me", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
            }
        })
        .then((response) => {
            return response.data;
        });
}

const getUserById = (uid, token) => {
    return API
        .get(`${API_BASE_URL}/user/${uid}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            return response.data;
        });
}

export default { getCurrentUser, getUserById }