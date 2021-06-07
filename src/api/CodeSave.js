import API from './API'

const save = (data, token) => {
    return API
        .post("/user/code/",
            data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
}

const getCodes = (token) => {
    return API
        .get("/user/code/",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
}

export default { save, getCodes };