import axios from "axios";

// React Notification
import swal from "sweetalert";

// Cookies JS
import Cookies from "js-cookie";

export async function DeleteVM(VMId) {
  // Get access token
  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  swal({
    title: "Yakin?",
    text: "Data perbaikan yang dihapus, tidak dapat kembali!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      try {
        await axios
          .delete(
            `http://silakend-server-realtime.test/api/vehiclemaintenances/${VMId}`,
            config
          )
          .then((response) => {
            const { msg } = response.data;
            swal({
              text: msg,
              icon: "success",
              button: false,
              timer: 2000,
            });
            window.location.reload();
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
      swal("Aksi dibatalkan");
    }
  });
}
