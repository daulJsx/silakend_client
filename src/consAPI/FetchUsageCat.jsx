import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import swal from "sweetalert";

async function FetchUsageCat() {
  try {
    const token = Cookies.get("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      "https://708c-180-244-139-240.ap.ngrok.io/api/usagecategories",
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
    const { msg, message } = error.response.data;
    if (message) {
      console.log(message);
    } else {
      console.log(msg);
    }
  }
}

export default FetchUsageCat;
