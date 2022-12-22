import axios from "axios";

// this is fetch function
async function fetchJobUnit() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios
      .get("http://silakend-server.xyz/api/jobunits", config)
      .then((response) => {
        const jobs = response.data;
        return jobs;
      });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export default fetchJobUnit;
