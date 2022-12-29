import axios from "axios";

async function FetchVehicles() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
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
