import axios from "axios";

// this is fetch function
async function fetchData() {
  try {
    const response = await axios.get(
      // "https://f58b-103-108-158-34.ngrok.io/api/users/"
      "https://jsonplaceholder.typicode.com/users"
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}

export default fetchData;
