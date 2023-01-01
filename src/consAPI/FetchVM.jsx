import axios from "axios";

// this is fetch function
async function FetchVM() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios
      .get("http://silakend-server.xyz/api/vehiclemaintenances", config)
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
