import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../utils/api";
import Loader from "./layout/Loader";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const { data } = await api.get(`/v1/eats/orders/${id}`);
        setOrder(data.order);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Could not load order details."
        );
      }
    };

    loadOrder();
  }, [id]);

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>

        <Link to="/orders" className="btn btn-success">
          Back to My Orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return <Loader />;
  }

  return (
    <main className="container order-details-page">

      {/* Header */}
      <div className="order-details-heading">
        <div>
          <Link to="/orders" className="back-orders">
            ← Back to My Orders
          </Link>

          <h1>Order Details</h1>

          <p>
            Order ID:{" "}
            <strong>{order._id}</strong>
          </p>
        </div>

        <span
          className={`order-status-badge ${order.orderStatus
            ?.toLowerCase()
            .replaceAll(" ", "-")}`}
        >
          {order.orderStatus}
        </span>
      </div>


      {/* Restaurant */}
      <section className="order-details-card">
        <h3>Restaurant</h3>

        <div className="restaurant-order-info">
          <span className="material-symbols-outlined">
            restaurant
          </span>

          <div>
            <strong>
              {order.restaurant?.name || "Restaurant"}
            </strong>
          </div>
        </div>
      </section>


      {/* Ordered Items */}
      <section className="order-details-card">
        <h3>Ordered Items</h3>

        <div className="order-detail-items">
          {order.orderItems?.map((item) => (
            <div
              className="order-detail-item"
              key={item.fooditem}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="order-detail-item-info">
                <h4>{item.name}</h4>

                <p>
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <strong>
                ₹{item.price * item.quantity}
              </strong>
            </div>
          ))}
        </div>
      </section>


      {/* Delivery Information */}
      <section className="order-details-card">
        <h3>Delivery Information</h3>

        <div className="delivery-info-grid">

          <div>
            <span className="material-symbols-outlined">
              location_on
            </span>

            <div>
              <small>Address</small>
              <p>{order.deliveryInfo?.address}</p>
            </div>
          </div>

          <div>
            <span className="material-symbols-outlined">
              location_city
            </span>

            <div>
              <small>City</small>
              <p>{order.deliveryInfo?.city}</p>
            </div>
          </div>

          <div>
            <span className="material-symbols-outlined">
              phone
            </span>

            <div>
              <small>Phone</small>
              <p>{order.deliveryInfo?.phoneNo}</p>
            </div>
          </div>

          <div>
            <span className="material-symbols-outlined">
              pin_drop
            </span>

            <div>
              <small>Postal Code</small>
              <p>{order.deliveryInfo?.postalCode}</p>
            </div>
          </div>

        </div>
      </section>


      {/* Payment + Total */}
      <section className="order-details-card order-payment-card">

        <h3>Payment & Total</h3>

        <div className="payment-row">
          <span>Items Price</span>
          <strong>₹{order.itemsPrice}</strong>
        </div>

        <div className="payment-row">
          <span>Delivery Charge</span>
          <strong>₹{order.deliveryCharge}</strong>
        </div>

        <div className="payment-row">
          <span>Payment Status</span>

          <strong className="payment-success">
            {order.paymentInfo?.status || "Paid"}
          </strong>
        </div>

        <hr />

        <div className="payment-total">
          <span>Total</span>
          <strong>₹{order.finalTotal}</strong>
        </div>

      </section>


      {/* Dates */}
      <section className="order-details-card order-date-card">

        <div>
          <small>Ordered On</small>
          <p>
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        {order.deliveredAt && (
          <div>
            <small>Delivered On</small>
            <p>
              {new Date(order.deliveredAt).toLocaleString()}
            </p>
          </div>
        )}

      </section>

    </main>
  );
};

export default OrderDetails;