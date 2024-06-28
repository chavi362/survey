import Cookies from 'js-cookie';

export async function serverRequests(method, URL, body) {
    const token = Cookies.get('token');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    if (method === 'GET') {
        try {
            const fetchResponse = await fetch(`http://localhost:3000/${URL}`, { method: 'GET', headers });
            if (fetchResponse.ok) {
                return fetchResponse;
            } else {
                throw new Error("user not found");
            }
        } catch (error) {
            return ({ status: 404, ok: false, error: error });
        }
    }

    const requestOptions = {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    };

    try {
        const fetchResponse = await fetch(`http://localhost:3000/${URL}`, requestOptions);
        if (fetchResponse.ok) {
            return fetchResponse;
        } else {
            throw new Error("user not found");
        }
    } catch (error) {
        return ({ status: 404, ok: false, error: error });
    }
}
