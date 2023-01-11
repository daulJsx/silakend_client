import axios from "axios";

// Cookies JS
import Cookies from "js-cookie";

//  fetch function
async function FetchUsers(limit) {
  const config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("_auth")}`,
    },
  };

  try {
    const response = await axios
      .get(`https://silakend-server.xyz/api/users?limit=${limit}`, config) // Request with asign the token
      .then((response) => {
        const users = response.data;
        return users;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export default FetchUsers;
