import axios from "axios";

import FetchVehicleUsages from "../../consAPI/FetchVehicleUsages";

// Cookies JS
import Cookies from "js-cookie";

// React Notification
import swal from "sweetalert";

export async function DeleteVU(usageId) {
  // Get access token
  const token = Cookies.get("_auth");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  swal({
    title: "Yakin?",
    text: "Data peminjaman yang dihapus, tidak dapat kembali!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      try {
        await axios
          .delete(
            `https://silakend-server.xyz/api/vehicleusages/${usageId}`,
            config
          )
          .then((response) => {
            if (response.status === 200) {
              swal({
                title: "Berhasil!",
                text: response.data.msg,
                icon: "success",
                button: "Tutup",
              });
              FetchVehicleUsages();
            }
          });
      } catch (error) {
        if (error.response.data.message) {
          swal("Ups!", "Something went wrong", "error");
        } else {
          swal("Ups!", error.response.data.msg, "error");
        }
      }
    } else {
      swal("Data peminjaman aman!");
    }
  });
}
