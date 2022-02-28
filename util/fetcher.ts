const baseUrl: RequestInfo = process.env.BASEURL ?? "http://localhost:8080"
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  };

export const getFetcher = async (url: RequestInfo) => {
    const res = await fetch(baseUrl + url, {
        method: "GET"
    })
    .then(r => r.json())
    return res;
}

export const postFetcher = async (url: RequestInfo, body: BodyInit) => {
    const res = await fetch(baseUrl + url, {
        method: "POST",
        headers,
        body,
    })
    
    return res.json();
}