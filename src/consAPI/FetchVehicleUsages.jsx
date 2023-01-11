import axios from "axios";

// Cookies JS
import Cookies from "js-cookie";

//  fetch function
async function FetchVehicleUsages() {
  try {
    const token = Cookies.get("_auth");
    if (!token) {
      throw new Error("Token kadaluarsa, silahkan login kembali");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      "https://silakend-server.xyz/api/vehicleusages",
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default FetchVehicleUsages;
