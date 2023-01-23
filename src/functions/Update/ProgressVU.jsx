import axios from "axios";
import { redirect } from "react-router-dom";

// Cookies JS
import Cookies from "js-cookie";

// React Notification
import swal from "sweetalert";

export const ProgressVU = async (order) => {
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

  const departTimeFromMap = depart_time;
  const getDepartDate = new Date(`1970-01-01T${departTimeFromMap}Z`);
  const departHours = getDepartDate.getUTCHours().toString().padStart(2, "0");
  const departMinutes = getDepartDate
    .getUTCMinutes()
    .toString()
    .padStart(2, "0");
  const formattedDepartTime = `${departHours}:${departMinutes}`;

  const arriveTimeFromMap = arrive_time || null;
  const formattedArriveTime = arriveTimeFromMap
    ? new Date(`1970-01-01T${arriveTimeFromMap}Z`).toISOString().substr(11, 5)
    : null;

  // Get access token
  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const body = {
    usage_id: usage_id,
    vehicle_id: vehicle_id,
    driver_id: driver_id,
    user_id: user_id,
    ucategory_id: ucategory_id,
    usage_description: usage_description,
    personel_count: personel_count,
    destination: destination,
    start_date: start_date,
    end_date: end_date,
    depart_date: depart_date,
    depart_time: formattedDepartTime,
    arrive_date: arrive_date,
    arrive_time: formattedArriveTime,
    distance_count_out: "",
    distance_count_in: "",
    status: "",
    status_description: "",
  };

  swal({
    title: "Konfirmasi keberangkatan?",
    text: "Klik ok untuk melanjutkan aksi ini",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
      swal({
        icon: "info",
        text: "Harap Masukkan Odometer Pergi",
        buttons: true,
        dangerMode: true,
        content: {
          element: "input",
        },
      }).then(async (distance_count_out) => {
        if (distance_count_out) {
          body.status = "PROGRESS";
          body.distance_count_out = distance_count_out;
          console.log(body);
          try {
            await axios
              .put(
                `https://silakend-server.xyz/api/vehicleusages/${usage_id}`,
                body,
                config
              )
              .then((response) => {
                redirect("/driver/tugas-masuk");
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
            text: "Harap isi odometer pergi",
          });
        }
      });
    } else {
      swal({
        text: "Aksi dibatalkan",
      });
    }
  });
};
