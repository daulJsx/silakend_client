import axios from "axios";

// Cookies JS
import Cookies from "js-cookie";

// React Notification
import swal from "sweetalert";

export const ProgressVU = async (order, navigate) => {
  let { usage_id } = order;

  // Get access token
  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const body = {
    distance_count_out: "",
    distance_count_in: "",
    status: "",
    status_description: "",
  };

  swal({
    title: "Konfirmasi keberangkatan?",
    text: "Klik ok untuk melanjutkan aksi ini",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      swal({
        icon: "info",
        text: "Harap Masukkan Odometer Pergi",
        buttons: true,
        dangerMode: true,
        content: {
          element: "input",
        },
      }).then(async (distance_count_out) => {
        if (distance_count_out) {
          body.status = "PROGRESS";
          body.distance_count_out = distance_count_out;

          try {
            await axios
              .put(
                `https://silakend-server.xyz/api/vehicleusages/${usage_id}`,
                body,
                config
              )
              .then((response) => {
                navigate(-1);
                swal({
                  title: "Keberangkatan Dikonfirmasi",
                  text: response.data.msg,
                  icon: "success",
                  button: false,
                  timer: 2000,
                });
              });
          } catch (error) {
            console.log(error.response.data);
            if (error.response) {
              const { message, msg } = error.response.data;
              if (message) {
                swal("Ups!", message, "error");
              } else {
                swal("Ups!", msg, "error");
              }
            } else {
              swal("Ups!", "Something went wrong", "error");
            }
          }
        } else {
          swal({
            text: "Harap isi odometer pergi",
          });
        }
      });
    } else {
      swal({
        text: "Aksi dibatalkan",
      });
    }
  });
};
