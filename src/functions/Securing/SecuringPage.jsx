// React Notification
import swal from "sweetalert";

import { useNavigate } from "react-router-dom";

export const SecuringPage = () => {
  const redirectTo = useNavigate();

  swal({
    title: "Maaf!",
    text: "Anda tidak memiliki akses ke halaman ini",
    icon: "error",
    button: false,
    timer: 3000,
  }).then(redirectTo(-1));
};
