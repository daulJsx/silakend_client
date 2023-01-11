import axios from "axios";

// Cookies JS
import Cookies from "js-cookie";

async function FetchVehicles() {
  const config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("_auth")}`,
    },
  };

  try {
    const response = await axios
      .get("https://silakend-server.xyz/api/vehicles", config)
      .then((response) => {
        const vehicles = response.data;
        return vehicles;
      });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export default FetchVehicles;
