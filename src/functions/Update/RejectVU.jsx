import axios from "axios";

// Cookies JS
import Cookies from "js-cookie";

// React Notification
import swal from "sweetalert";

export const RejectVU = async (order, navigate) => {
  let {
    ucategory_id,
    destination,
    start_date,
    end_date,
    personel_count,
    usage_description,
    usage_id,
  } = order;
  // Get access token
  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const body = {
    ucategory_id: ucategory_id,
    destination: destination,
    start_date: start_date,
    end_date: end_date,
    usage_description: usage_description,
    personel_count: personel_count,
    status: "",
    status_description: "",
  };

  swal({
    title: "Tolak Pengajuan?",
    text: "Klik ok untuk melanjutkan aksi ini",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      swal({
        icon: "info",
        text: "Harap Masukkan Keterangan",
        buttons: true,
        dangerMode: true,
        content: {
          element: "input",
        },
      }).then(async (status_description) => {
        if (status_description) {
          body.status = "REJECTED";
          body.status_description = status_description;
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
                  text: response.data.msg,
                  icon: "success",
                  button: false,
                  timer: 3000,
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
            text: "Harap isi keterangan",
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
