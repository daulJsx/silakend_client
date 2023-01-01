import axios from "axios";

// React Notification
import swal from "sweetalert";

export async function DeleteVM(VMId) {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  swal({
    title: "Yakin?",
    text: "Data perbaikan yang dihapus, tidak dapat kembali!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      await axios
        .delete(
          `http://silakend-server.xyz/api/vehiclemaintenances/${VMId}`,
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
          } else {
            swal({
              title: "Gagal!",
              text: response.data.msg,
              icon: "error",
              button: "Tutup",
            });
          }
        });
    } else {
      swal("Data perbaikan aman!");
    }
  });
}
