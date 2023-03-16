// Axios
import axios from "axios";
import { redirect } from "react-router-dom";

// Cookies JS
import Cookies from "js-cookie";
import swal from "sweetalert";

export const LogOut = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  const body = {
    body: {},
  };

  try {
    await axios
      .post(
        "https://708c-180-244-139-240.ap.ngrok.io/api/auth/logout",
        body,
        config
      )
      .then((response) => {
        if (response.status === 200) {
          swal({
            text: response.data.msg,
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          localStorage.clear();
          Cookies.remove("token");
          redirect("/silakend-login");
        }
      });
  } catch (error) {
    if (error.response.data.message) {
      swal("Ups!", error.response.data.message, "error");
    } else {
      swal("Ups!", error.response.data.msg, "error");
    }
  }
};
