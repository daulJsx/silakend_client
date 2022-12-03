import axios from "axios";

// this is fetch function
async function fetchData() {
  const config = {
    headers: {
      Authorization: `Bearer ${"EuFmXsx4Sou6uqeUBvBXNsKLcQdsriFPKsNdklYg"}`,
    },
  };

  try {
    const response = await axios.get(
      "https://b37d-114-122-106-155.ap.ngrok.io/api/roles",
      config
      // "https://jsonplaceholder.typicode.com/users"
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}

export default fetchData;
