// React Notification
import swal from "sweetalert";

// For checking user have done in authentication
import { useAuthUser } from "react-auth-kit";

import { Navigate } from "react-router-dom";

export const SecuringPage = () => {
  const auth = useAuthUser();

  swal({
    title: "Maaf!",
    text: "Anda tidak memiliki akses ke halaman ini",
    icon: "warning",
  });

  return auth().user_level === 5 ? (
    <Navigate to="/user/pengajuan-saya" />
  ) : auth().user_level === 4 ? (
    <Navigate to="/driver/daftar-tugas" />
  ) : auth().user_level === 3 ? (
    <Navigate to="/verifier/pengajuan-pegawai" />
  ) : (
    <Navigate to="/" />
  );
};
