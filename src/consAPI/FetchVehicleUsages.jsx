import axios from "axios";

//  fetch function
async function FetchVehicleUsages() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios
      .get("https://silakend-server.xyz/api/vehicleusages", config) // Request with asign the token
      .then((response) => {
        const orders = response.data;
        return orders;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default FetchVehicleUsages;
