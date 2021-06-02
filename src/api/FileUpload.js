import API from './API'


const upload = (data, token) => {
    return API
        .post("/file/",
            data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
}

const read = (fileName, token) => {
    return API
        .get(`/file/${fileName}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
}

export default { upload, read };