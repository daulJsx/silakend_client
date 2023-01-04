import axios from "axios";

// React Notification
import swal from "sweetalert";

export async function DeleteUsageCat(usageCatId) {
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
    text: "Data kategori peminjaman yang dihapus, tidak dapat kembali!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
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
          }
        })
        .catch((error) => {
          handleError(error);
        });
    } else {
      swal("Data kategori peminjaman aman!");
    }
  });
}