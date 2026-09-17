import { useEffect, useMemo, useState } from "react";
import api from "../../utils/api";
import Loader from "../layout/Loader";
import Message from "../Message";
import OrderStatusSelect from "../OrderStatusSelect";

const STATUS_STYLES = {
  Processing: "bg-secondary",
  Confirmed: "bg-info text-dark",
  Preparing: "bg-warning text-dark",
  "Out for delivery": "bg-primary",
  Delivered: "bg-success",
  Cancelled: "bg-danger",
};

const FILTERS = ["All", "Processing", "Confirmed", "Preparing", "Out for delivery", "Delivered", "Cancelled"];

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data } = await api.get("/v1/eats/orders/admin/all");
        setOrders(data.orders);
        setTotalAmount(data.totalAmount);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleUpdated = (updatedOrder) => {
    setOrders((prev) => prev.map((order) => (order._id === updatedOrder._id ? updatedOrder : order)));
  };

  const sortedOrders = useMemo(
    () => [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [orders]
  );

  const visibleOrders = useMemo(
    () => (filter === "All" ? sortedOrders : sortedOrders.filter((order) => order.orderStatus === filter)),
    [sortedOrders, filter]
  );

  if (loading) return <Loader />;
  if (error) return <div className="container mt-4"><Message variant="danger">{error}</Message></div>;

  return (
    <div className="container mt-4 admin-orders-page">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <h2 className="mb-0">All Orders</h2>
        <div className="admin-orders-summary">
          <span>{orders.length} order{orders.length !== 1 ? "s" : ""}</span>
          <span className="admin-orders-revenue">₹{totalAmount}</span>
        </div>
      </div>

      <div className="admin-orders-filters">
        {FILTERS.map((status) => (
          <button
            key={status}
            type="button"
            className={`btn btn-sm ${filter === status ? "btn-dark" : "btn-outline-secondary"}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {visibleOrders.length === 0 ? (
        <p className="text-muted mt-4">No orders match this filter.</p>
      ) : (
        <div className="table-responsive mt-3">
          <table className="table admin-orders-table align-middle">
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Restaurant</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleOrders.map((order) => (
                <tr key={order._id}>
                  <td className="order-id">#{order._id.slice(-8).toUpperCase()}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <div>{order.user?.name || "—"}</div>
                    <div className="text-muted small">{order.user?.email}</div>
                  </td>
                  <td>{order.restaurant?.name || "—"}</td>
                  <td>{order.orderItems.reduce((total, item) => total + item.quantity, 0)}</td>
                  <td className="fw-bold">₹{order.finalTotal}</td>
                  <td>
                    <div className="d-flex flex-column gap-2 align-items-start">
                      <span className={`badge rounded-pill ${STATUS_STYLES[order.orderStatus] || "bg-secondary"}`}>
                        {order.orderStatus}
                      </span>
                      <OrderStatusSelect order={order} onUpdated={handleUpdated} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
