export function GetOrderId(currentOrder) {
  let { usage_id } = currentOrder;
  localStorage.setItem("usage_id", usage_id);
  localStorage.setItem("orderToMap", JSON.stringify(currentOrder));
}
