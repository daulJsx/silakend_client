import axios from "axios";

// this is fetch function
async function FetchUsers(key, limit) {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios
      .get(`http://silakend-server.xyz/api/users?limit=${limit}`, config)
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
