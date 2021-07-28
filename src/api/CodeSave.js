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

const update = (data, token) => {
    return API
        .put("/user/code/",
            data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
}

const getCodes = (token, language) => {
    return API
        .get(`/user/code?language=${language}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
}

const getAllCodes = (token) => {
    return API
        .get(`/code-save/codes`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
}

const getAllCodesByName = (token, name) => {
    return API
        .get(`/code-save/code?name=${name}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
}

const deleteCode = (uid, token) => {
    return API
        .delete(`/user/code/${uid}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
}

export default { save, update, getCodes, deleteCode, getAllCodes, getAllCodesByName };