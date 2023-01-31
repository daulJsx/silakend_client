import axios from "axios";
import { redirect } from "react-router-dom";

// Cookies JS
import Cookies from "js-cookie";

// React Notification
import swal from "sweetalert";

export const ApproveVU = async (order) => {
  let {
    vehicle_id,
    driver_id,
    ucategory_id,
    destination,
    start_date,
    end_date,
    personel_count,
    usage_description,
    usage_id,
    user_id,
    distance_count_in,
    distance_count_out,
  } = order;

  // Get access token
  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const body = {
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
            `http://silakend-server-realtime.test/api/vehicleusages/${usage_id}`,
            body,
            config
          )
          .then((response) => {
            redirect("/verifier/pengajuan-pegawai");
            swal({
              text: response.data.msg,
              icon: "success",
              button: false,
              timer: 2000,
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
