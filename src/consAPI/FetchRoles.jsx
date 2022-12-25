import axios from "axios";

// this is fetch function
async function fetchRoles() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios
      .get("http://silakend-server.xyz/api/roles", config)
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