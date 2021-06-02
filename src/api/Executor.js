import API from './API'


const execute = (language, code, token) => {
    
    return API
        .post("/execute/", {
            language,
            code,
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
}

export default { execute, };