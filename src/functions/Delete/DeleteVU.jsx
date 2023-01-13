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
            swal({
              title: "Berhasil!",
              text: response.data.msg,
              icon: "success",
              button: "Tutup",
            });
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
      userLevel === 5
        ? swal("Pengajuan peminjaman anda aman!")
        : swal("Data peminjaman aman!");
    }
  });
};
