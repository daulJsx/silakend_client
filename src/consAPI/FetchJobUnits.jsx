import axios from "axios";
// Cookies JS
import Cookies from "js-cookie";

// this is fetch function
async function FetchJobUnits() {
  const config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("_auth")}`,
    },
  };

  try {
    const response = await axios
      .get("https://silakend-server.xyz/api/jobunits", config)
      .then((response) => {
        const jobs = response.data;
        return jobs;
      });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export default FetchJobUnits;
