import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000/",
// });

// export default api;

import Cookies from 'js-cookie';

export async function serverRequests(method, URL, body) {
    const token = Cookies.get('token');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
  if (method === 'GET') {
      try {
          const fetchResponse = await fetch(`http://localhost:3000/${URL}`, {method: 'GET', headers,});
          console.log(fetchResponse);
          if (fetchResponse.ok) {
              return fetchResponse;
          } else {
              throw new Error("user not found");

          }
      } catch (error) {
          return ({status: 404, ok: false, error: error });
      }
  }

     const requestOption = {
      method: method,
      headers: headers,
      body: JSON.stringify(body)
  };

  try {
      const fetchResponse = await fetch(`http://localhost:3000/${URL}`, requestOption);
      if (fetchResponse.ok) {
          console.log('fetch response: ', fetchResponse);
          return fetchResponse;
      } else {
          // console.error(`${method} request failed:`, fetchResponse.statusText);
          throw new Error("user not found");
      }
  } catch (error) {
      // console.error(`Error in ${method} request:`, error);
      return ({status: 404, ok: false, error: error });
  }
}
