import axios from "axios";

// Cookies JS
import Cookies from "js-cookie";

// this is fetch function
async function fetchRoles() {
  const config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("_auth")}`,
    },
  };

  try {
    const response = await axios
      .get("https://silakend-server.xyz/api/roles", config)
      .then((response) => {
        const roles = response.data;
        return roles;
      });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export default fetchRoles;
