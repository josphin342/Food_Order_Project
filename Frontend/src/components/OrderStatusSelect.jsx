import { useState } from "react";
import api from "../utils/api";

const statuses = [
  "Processing",
  "Confirmed",
  "Preparing",
  "Out for delivery",
  "Delivered",
  "Cancelled",
];

export default function OrderStatusSelect({ order, onUpdated }) {
  const [status, setStatus] = useState(order.orderStatus);
  const [saving, setSaving] = useState(false);

  const updateStatus = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    setSaving(true);

    try {
      const { data } = await api.patch(
        `/v1/eats/orders/${order._id}/status`,
        { orderStatus: newStatus }
      );

      onUpdated?.(data.order);
    } catch (error) {
      setStatus(order.orderStatus);
      alert(error.response?.data?.message || "Could not update order status");
    } finally {
      setSaving(false);
    }
  };

  return (
    <select
      className="form-select form-select-sm"
      style={{ width: "auto" }}
      value={status}
      onChange={updateStatus}
      disabled={saving}
    >
      {statuses.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}