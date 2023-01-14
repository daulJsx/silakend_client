import axios from "axios";

// Cookies JS
import Cookies from "js-cookie";

import { redirect } from "react-router-dom";
import swal from "sweetalert";

async function FetchVehicles() {
  try {
    const token = Cookies.get("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      "https://silakend-server.xyz/api/vehicles",
      config
    );

    if (!token) {
      redirect("/silakend-login");
      swal({
        title: response.data.msg,
        text: "Anda tidak memiliki akses, atau token sudah kadaluarsa, silahkan login kembali",
        icon: "success",
      });
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default FetchVehicles;
