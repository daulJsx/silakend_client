import axios from "axios";

// this is fetch function
async function FetchVMDetails() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios
      .get("https://silakend-server.xyz/api/vehiclemaintenancedetails", config)
      .then((response) => {
        const maintenances = response.data;
        return maintenances;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default FetchVMDetails;