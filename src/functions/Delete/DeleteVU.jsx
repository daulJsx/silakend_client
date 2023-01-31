import axios from "axios";

import FetchVehicleUsages from "../../consAPI/FetchVehicleUsages";

// Cookies JS
import Cookies from "js-cookie";

// React Notification
import swal from "sweetalert";

export const DeleteVU = async (usageId, setAuthUser) => {
  // Get access token
  const token = Cookies.get("token");
  // check user level
  const userLevel = setAuthUser;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  swal(
    userLevel === 5
      ? {
          title: "Batalkan Pengajuan?",
          text: "Klik ok untuk melanjutkan aksi ini",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }
      : {
          title: "Yakin?",
          text: "Data peminjaman yang dihapus, tidak dapat kembali!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }
  ).then(async (willDelete) => {
    if (willDelete) {
      try {
        await axios
          .delete(
            `https://silakend-server.xyz/api/vehicleusages/${usageId}`,
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
            FetchVehicleUsages();
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
};
