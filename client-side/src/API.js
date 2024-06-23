// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000/",
// });

// export default api;



export async function serverRequests(method, URL, body) {
  if (method === 'GET') {
      try {
          const fetchResponse = await fetch(`http://localhost:3000/${URL}`);
          console.log(fetchResponse);
          if (fetchResponse.ok) {
          //     const data = await fetchResponse.json();
          //     console.log('GET request data:', data); // Log the data received
              return fetchResponse;
          } else {
              // console.error('GET request failed:', fetchResponse.statusText);
              throw new Error("user not found");

          }
      } catch (error) {
          // console.error('Error in GET request:', error);
          return ({status: 404, ok: false, error: error });
      }
  }

     const requestOption = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
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
