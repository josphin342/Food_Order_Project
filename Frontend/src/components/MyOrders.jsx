import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data } = await api.get(
          "/v1/eats/orders/me/myOrders"
        );

        setOrders(data.orders);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Could not load orders"
        );
      }
    };

    loadOrders();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="container my-orders-page mt-4">

      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="order-card mb-3"
          >

            <div className="order-card-header">
              <span className="order-id">
                Order #{order._id.slice(-8)}
              </span>

              <span className="order-date">
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </span>
            </div>

            <p className="order-restaurant">
              {order.restaurant?.name || "Restaurant"}
            </p>

            <p>
              Status:{" "}
              <strong>{order.orderStatus}</strong>
            </p>

            <div className="order-card-footer">
              <span className="order-total">
                ₹{order.finalTotal}
              </span>

              <Link
                to={`/orders/${order._id}`}
                className="btn btn-outline-success"
              >
                View Details
              </Link>
            </div>

          </div>
        ))
      )}

    </main>
  );
}