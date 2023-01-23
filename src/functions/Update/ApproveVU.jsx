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
    arrive_date,
    arrive_time,
    depart_date,
    depart_time,
  } = order;

  // Get access token
  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const departTimeFromMap = depart_time || null;
  const formattedDepartTime = departTimeFromMap
    ? new Date(`1970-01-01T${departTimeFromMap}Z`).toISOString().substr(11, 5)
    : null;

  const arriveTimeFromMap = arrive_time || null;
  const formattedArriveTime = arriveTimeFromMap
    ? new Date(`1970-01-01T${arriveTimeFromMap}Z`).toISOString().substr(11, 5)
    : null;

  const body = {
    vehicle_id: vehicle_id,
    driver_id: driver_id,
    user_id: user_id,
    ucategory_id: ucategory_id,
    destination: destination,
    start_date: start_date,
    end_date: end_date,
    depart_date: depart_date,
    depart_time: formattedDepartTime,
    arrive_date: arrive_date,
    arrive_time: formattedArriveTime,
    distance_count_out: distance_count_out,
    distance_count_in: distance_count_in,
    usage_description: usage_description,
    personel_count: personel_count,
    status: vehicle_id && driver_id ? "READY" : "APPROVED",
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
            redirect("/verifier/pengajuan-pegawai");
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
