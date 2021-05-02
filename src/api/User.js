import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import axios from 'axios';

const getCurrentUser = () => {
    return axios
        .get(API_BASE_URL + "/user/me", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
            }
        })
        .then((response) => {
            return response.data;
        });
}

export default { getCurrentUser }