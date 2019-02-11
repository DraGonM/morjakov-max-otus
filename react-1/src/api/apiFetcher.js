import fetch from 'isomorphic-fetch'

const proxyUrl = 'http://163.172.179.158:30080/'

const handleErrors = (url, response) => {

    console.log('response:', response)

    if (response.ok)
        return response
    
    throw new Error(`[Error ${response.status}] ${url}`)  
}


const fetcher = {
    get: (url) =>
        fetch(proxyUrl + url)
        .then(response => handleErrors(url, response))
        .then(response => response.json()),

    post: (url, data) =>
        fetch(proxyUrl + url, {
            body: JSON.stringify(data),
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            }),
            method: 'POST',
        })
        .then(response => handleErrors(url, response))
        .then(response => response.json()),
} 

export default fetcher
