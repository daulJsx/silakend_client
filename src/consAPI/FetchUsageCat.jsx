import axios from "axios";
import Cookies from "js-cookie";

async function FetchUsageCat() {
  try {
    const token = Cookies.get("_auth");
    if (!token) {
      throw new Error("Token kadaluarsa, silahkan login kembali");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      "https://silakend-server.xyz/api/usagecategories",
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default FetchUsageCat;
