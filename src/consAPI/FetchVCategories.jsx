import axios from "axios";

// Cookies JS
import Cookies from "js-cookie";

async function FetchVCategories() {
  const config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("_auth")}`,
    },
  };

  try {
    const response = await axios
      .get("https://silakend-server.xyz/api/vehiclecategories", config)
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
