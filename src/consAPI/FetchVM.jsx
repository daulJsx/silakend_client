import axios from "axios";

// fetch function
async function FetchVM() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios
      .get("https://silakend-server.xyz/api/vehiclemaintenances", config) // Request with asign the token
      .then((response) => {
        const maintenances = response.data;
        return maintenances;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default FetchVM;
