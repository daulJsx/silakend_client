export function UseGetUserById(users) {
  let { user_id, nip, name, address, phone, email, job_unit, role } = users;

  localStorage.setItem("user_id", user_id);
  localStorage.setItem("nip", nip);
  localStorage.setItem("name", name);
  localStorage.setItem("address", address);
  localStorage.setItem("phone", phone);
  localStorage.setItem("email", email);
  localStorage.setItem("job_unit", job_unit.name);
  localStorage.setItem("unit_id", job_unit.unit_id);
  localStorage.setItem("role", JSON.stringify(role));
  localStorage.setItem("oldRoleId", role[0].role_id);
}
