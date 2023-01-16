import axios from "axios";
import { redirect } from "react-router-dom";

// Cookies JS
import Cookies from "js-cookie";

// React Notification
import swal from "sweetalert";

export const ApproveVU = async (order) => {
  console.log(order);
  let {
    ucategory_id,
    vehicle_id,
    driver_id,
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
    vehicle_id: vehicle_id ? vehicle_id : null,
    driver_id: driver_id ? driver_id : null,
    user_id: user_id,
    usage_id: usage_id,
    ucategory_id: ucategory_id,
    destination: destination,
    start_date: start_date,
    end_date: end_date,
    usage_description: usage_description,
    personel_count: personel_count,
    status: "APPROVED",
    status_description: "",
  };

  swal({
    title: "Approve Pengajuan?",
    text: "Klik ok untuk melanjutkan aksi ini",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    console.log(body);
    if (willDelete) {
      try {
        await axios
          .put(
            `https://silakend-server.xyz/api/vehicleusages/${usage_id}`,
            body,
            config
          )
          .then((response) => {
            redirect("/verifier/data-pengajuan-peminjaman");
            swal({
              title: "Berhasil!",
              text: response.data.msg,
              icon: "success",
              button: "Tutup",
            });
          });
      } catch (error) {
        console.log(error.response.data);
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
      swal({
        text: "Aksi dibatalkan",
      });
    }
  });
};
