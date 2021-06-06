import API from './API'

const upload = (data, token) => {
    return API
        .post("/user/file/",
            data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
}

const getFiles = (token) => {
    return API
        .get("/user/file/",
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
}

export default { upload, getFiles };