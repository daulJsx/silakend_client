import axios from "axios";

// React Notification
import swal from "sweetalert";

// Cookies JS
import Cookies from "js-cookie";

export async function DeleteJobUnit(unitId) {
  // Get access token
  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  swal({
    title: "Yakin?",
    text: "Data unit kerja yang dihapus, tidak dapat kembali!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      try {
        await axios
          .delete(`https://silakend-server.xyz/api/jobunits/${unitId}`, config)
          .then((response) => {
            swal({
              title: "Berhasil!",
              text: response.data.msg,
              icon: "success",
              button: "Tutup",
            });
          });
      } catch (error) {
        if (error.response.data.message) {
          swal("Ups!", "Something went wrong", "error");
        } else {
          swal("Ups!", error.response.data.msg, "error");
        }
      }
    } else {
      swal("Data unit kerja aman!");
    }
  });
}
