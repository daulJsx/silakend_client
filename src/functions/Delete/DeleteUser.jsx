import axios from "axios";

// React Notification
import swal from "sweetalert";

export async function DeleteUser(userId) {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  swal({
    title: "Yakin?",
    text: "Data pengguna yang dihapus, tidak dapat kembali!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      await axios
        .delete(`https://silakend-server.xyz/api/users/${userId}`, config)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.msg);
            swal({
              title: "Berhasil!",
              text: response.data.msg,
              icon: "success",
              button: "Tutup",
            });
          } else {
            console.log(response.data.msg);
            swal({
              title: "Gagal!",
              text: response.data.msg,
              icon: "error",
              button: "Tutup",
            });
          }
        });
    } else {
      swal("Data pengguna aman!");
    }
  });
}
