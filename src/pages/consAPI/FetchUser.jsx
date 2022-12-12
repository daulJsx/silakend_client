import axios from "axios";

// this is fetch function
async function fetchData() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios.get(
      "https://8e78-114-5-208-18.ap.ngrok.io/api/users",
      config
      // "https://jsonplaceholder.typicode.com/users"
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}

export default fetchData;
