import { API_BASE_URL } from '../constants';
import API from './API'


const execute = (language, code, token) => {
    
    return API
        .post(API_BASE_URL + "/execute/", {
            language,
            code,
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
}

export default { execute, };