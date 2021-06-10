import API from './API'


const urlFromKey = (key, token) => {
    return API
        .get(`/private-files/url/${key}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
}

export default { urlFromKey };