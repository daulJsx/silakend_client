export function GetVehicleById(currentVehicle) {
  let {
    vehicle_id,
    name,
    year,
    license_number,
    tax_date,
    valid_date,
    distance_count,
    vcategory_id,
  } = currentVehicle;

  localStorage.setItem("vehicleId", vehicle_id);
  localStorage.setItem("vehicleName", name);
  localStorage.setItem("year", year);
  localStorage.setItem("licenseNumber", license_number);
  localStorage.setItem("taxDate", tax_date);
  localStorage.setItem("validDate", valid_date);
  localStorage.setItem("distanceCount", distance_count);
  localStorage.setItem("vcatId", vcategory_id);
}
