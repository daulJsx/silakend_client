import axios from "axios";

// React Notification
import swal from "sweetalert";
// Cookies JS
import Cookies from "js-cookie";

export async function DeleteVMD(VMDId) {
  // Get access token
  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  swal({
    title: "Yakin?",
    text: "Data rincian yang dihapus, tidak dapat kembali!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      try {
        await axios
          .delete(
            `https://silakend-server.xyz/api/vehiclemaintenancedetails/${VMDId}`,
            config
          )
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
      swal("Data rincian aman!");
    }
  });
}
