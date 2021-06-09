import API from './API'


const execute = (language, code, currentFile, token) => {
    return API
        .post("/execute/", {
            language,
            code,
            key: currentFile.key
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
}

export default { execute, };