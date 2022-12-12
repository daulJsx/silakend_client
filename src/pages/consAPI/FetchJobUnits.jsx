import axios from "axios";

// this is fetch function
async function fetchJobUnit() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios.get(
      "https://8e78-114-5-208-18.ap.ngrok.io/api/jobunits",
      config
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}

export default fetchJobUnit;
