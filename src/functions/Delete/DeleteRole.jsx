import axios from "axios";

// React Notification
import swal from "sweetalert";

export async function DeleteRole(roleId) {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  function handleError(error) {
    if (error.response.data.message) {
      swal("Ups!", error.response.data.message, "error");
    } else {
      swal("Ups!", error.response.data.msg, "error");
    }
  }

  swal({
    title: "Yakin?",
    text: "Data peran yang dihapus, tidak dapat kembali!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      await axios
        .delete(`https://silakend-server.xyz/api/roles/${roleId}`, config)
        .then((response) => {
          if (response.status === 200) {
            swal({
              title: "Berhasil!",
              text: response.data.msg,
              icon: "success",
              button: "Tutup",
            });
          }
        })
        .catch((error) => {
          handleError(error);
        });
    } else {
      swal("Data peran aman!");
    }
  });
}
