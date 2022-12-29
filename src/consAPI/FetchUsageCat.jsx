import axios from "axios";

// this is fetch function
async function FetchUsageCat() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios
      .get("https://silakend-server.xyz/api/usagecategories", config)
      .then((response) => {
        const uC = response.data;
        return uC;
      });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export default FetchUsageCat;
