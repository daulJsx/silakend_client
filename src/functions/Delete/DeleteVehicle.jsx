import axios from "axios";

// Cookies JS
import Cookies from "js-cookie";

// React Notification
import swal from "sweetalert";

export async function DeleteVehicle(vehicleId) {
  // Get access token
  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  swal({
    title: "Yakin?",
    text: "Data kendaraan yang dihapus, tidak dapat kembali!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      try {
        await axios
          .delete(
            `http://silakend-server-realtime.test/api/vehicles/${vehicleId}`,
            config
          )
          .then((response) => {
            const { msg } = response.data;
            swal({
              text: msg,
              icon: "success",
              button: false,
              timer: 3000,
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
