import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import API from './API'


const execute = (language, code, token) => {
    
    return API
        .post(API_BASE_URL + "/execute/", {
            language: language,
            code: code,
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
}

export default { execute, };