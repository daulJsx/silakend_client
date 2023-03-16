import axios from "axios";

// Cookies JS
import Cookies from "js-cookie";

// React Notification
import swal from "sweetalert";

export const CancelVU = async (order, navigate) => {
  let {
    usage_id,
    ucategory_id,
    destination,
    start_date,
    end_date,
    personel_count,
    usage_description,
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
    title: "Batalkan Pengajuan?",
    text: "Klik ok untuk melanjutkan aksi ini",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      swal({
        icon: "info",
        text: "Jelaskan mengapa anda membatalkan pengajuan ini",
        buttons: true,
        dangerMode: true,
        content: {
          element: "input",
        },
      }).then(async (status_description) => {
        if (status_description) {
          body.status_description = status_description;
          body.status = "CANCELED";

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
                  text: response.data.msg,
                  icon: "success",
                  button: false,
                  timer: 2000,
                });
              });
          } catch (error) {
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
            text: "Pengajuan peminjaman kendaraan tidak dibatalkan",
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
