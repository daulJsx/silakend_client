import axios from "axios";

// React Notification
import swal from "sweetalert";

export async function DeleteVMD(VMDId) {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  function handleError(error) {
    swal("Ups!", error.response.data.msg, "error");
  }

  swal({
    title: "Yakin?",
    text: "Data rincian yang dihapus, tidak dapat kembali!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
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
        })
        .catch((error) => {
          handleError(error);
        });
    } else {
      swal("Data rincian aman!");
    }
  });
}
