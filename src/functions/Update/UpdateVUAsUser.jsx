import { useNavigate } from "react-router-dom";
import axios from "axios";

import FetchVehicleUsages from "../../consAPI/FetchVehicleUsages";

// Cookies JS
import Cookies from "js-cookie";

// React Notification
import swal from "sweetalert";

export const UpdateVUAsUser = async (order) => {
  let {
    ucategory_id,
    destination,
    start_date,
    end_date,
    personel_count,
    usage_description,
    usage_id,
    user_id,
  } = order;
  // Get access token
  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const body = {
    user_id: user_id,
    usage_id: usage_id,
    ucategory_id: ucategory_id,
    destination: destination,
    start_date: start_date,
    end_date: end_date,
    usage_description: usage_description,
    personel_count: personel_count,
    status: "CANCELED",
  };

  const navigate = useNavigate();

  swal({
    title: "Batalkan Pengajuan?",
    text: "Klik ok untuk melanjutkan aksi ini",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      try {
        await axios
          .put(
            `https://silakend-server.xyz/api/vehicleusages/${usage_id}`,
            body,
            config
          )
          .then((response) => {
            swal({
              title: "Berhasil!",
              text: response.data.msg,
              icon: "success",
              button: "Tutup",
            });
            navigate("/user/data-pengajuan-peminjaman");
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
      swal("Pengajuan peminjaman anda aman!");
    }
  });
};
