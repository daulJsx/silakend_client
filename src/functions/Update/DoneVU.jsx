import axios from "axios";

// Cookies JS
import Cookies from "js-cookie";

// React Notification
import swal from "sweetalert";

export const DoneVU = async (order, navigate) => {
  let { usage_id, distance_count_out } = order;

  // Get access token
  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const body = {
    distance_count_out: distance_count_out,
    distance_count_in: "",
    status: "",
  };

  swal({
    title: "Selesaikan Tugas?",
    text: "Klik ok untuk melanjutkan aksi ini",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      swal({
        icon: "info",
        text: "Harap Masukkan Odometer Pulang",
        buttons: true,
        dangerMode: true,
        content: {
          element: "input",
        },
      }).then(async (distance_count_in) => {
        if (distance_count_in) {
          body.status = "DONE";
          body.distance_count_in = distance_count_in;
          try {
            await axios
              .put(
                `https://708c-180-244-139-240.ap.ngrok.io/api/vehicleusages/${usage_id}`,
                body,
                config
              )
              .then((response) => {
                navigate(-1);
                swal({
                  title: "Tugas Diselesaikan",
                  text: response.data.msg,
                  icon: "success",
                  button: "Tutup",
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
            text: "Harap isi odometer pulang!",
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
