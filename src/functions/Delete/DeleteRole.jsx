import axios from "axios";

// Cookies JS
import Cookies from "js-cookie";

// React Notification
import swal from "sweetalert";

export async function DeleteRole(roleId) {
  // Get access token
  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  swal({
    title: "Yakin?",
    text: "Data peran yang dihapus, tidak dapat kembali!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      try {
        await axios
          .delete(`https://silakend-server.xyz/api/roles/${roleId}`, config)
          .then((response) => {
            swal({
              title: "Berhasil!",
              text: response.data.msg,
              icon: "success",
              button: "Tutup",
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
      swal("Data peran aman!");
    }
  });
}
