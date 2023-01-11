import axios from "axios";

// Cookies JS
import Cookies from "js-cookie";

import FetchUsageCat from "../../consAPI/FetchUsageCat";

// React Notification
import swal from "sweetalert";

export async function DeleteUsageCat(usageCatId) {
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
            `https://silakend-server.xyz/api/usagecategories/${usageCatId}`,
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
              FetchUsageCat();
            }
          });
      } catch (error) {
        if (error.response.data.message) {
          swal("Ups!", error.response.data.message, "error");
        } else {
          swal("Ups!", error.response.data.msg, "error");
        }
      }
    } else {
      swal("Data peminjaman aman!");
    }
  });
}
