import axios from "axios";

async function FetchVCategories() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios
      .get("http://silakend-server.xyz/api/vehiclecategories", config)
      .then((response) => {
        const vCategories = response.data;
        return vCategories;
      });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export default FetchVCategories;
