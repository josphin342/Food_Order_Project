import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchCart,
  removeCartItem,
  updateCartItem,
} from "../redux/slices/cartSlice";
import api from "../utils/api";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading, updating, error } = useSelector(
    (state) => state.cart
  );

  const items = cart?.items || [];

  // Total quantity of all food items
  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total price
  const itemTotal = items.reduce(
    (total, item) => total + item.foodItem.price * item.quantity,
    0
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const changeQuantity = (item, quantity) => {
    if (quantity < 1) {
      return dispatch(removeCartItem(item.foodItem._id));
    }

    dispatch(
      updateCartItem({
        foodItemId: item.foodItem._id,
        quantity,
      })
    );
  };

  const checkout = async () => {
    try {
      const { data } = await api.post("/v1/eats/payment/process", {
        items,
      });

      window.location.assign(data.url);
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        navigate("/users/login");
      } else {
        toast.error(
          requestError.response?.data?.message ||
            "Unable to begin checkout."
        );
      }
    }
  };

  if (loading) {
    return <p className="mt-4 text-center">Loading your cart…</p>;
  }

  if (!items.length) {
    return (
      <div className="mt-5 text-center">
        <h2>Your cart is empty</h2>

        <Link className="btn btn-success mt-3" to="/">
          Browse restaurants
        </Link>
      </div>
    );
  }

  return (
    <main className="container mt-4 cart-page">
      <h2>{cart.restaurant?.name || "Your cart"}</h2>

      <div className="row">
        {/* Cart Items */}
        <section className="col-lg-8">
          {items.map((item) => (
            <article
              className="cart-item d-flex align-items-center"
              key={item.foodItem._id}
            >
              <img
                className="cart-image me-3"
                src={
                  item.foodItem.images?.[0]?.url ||
                  "/images/placeholder.png"
                }
                alt={item.foodItem.name}
              />

              <div className="flex-grow-1">
                <h5>{item.foodItem.name}</h5>
                <strong>₹{item.foodItem.price}</strong>
              </div>

              {/* Quantity */}
              <div className="stockCounter d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary"
                  disabled={updating}
                  onClick={() =>
                    changeQuantity(item, item.quantity - 1)
                  }
                >
                  -
                </button>

                <span className="mx-3">{item.quantity}</span>

                <button
                  className="btn btn-outline-success"
                  disabled={
                    updating ||
                    item.quantity >= item.foodItem.stock
                  }
                  onClick={() =>
                    changeQuantity(item, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                className="btn btn-link text-danger ms-3"
                disabled={updating}
                onClick={() =>
                  dispatch(removeCartItem(item.foodItem._id))
                }
              >
                Remove
              </button>
            </article>
          ))}
        </section>

        {/* Order Summary */}
        <aside className="col-lg-4">
          <div id="order_summary">
            <h4>Order summary</h4>

            <hr />

            <p>
              Items
              <span className="order-summary-values">
                {totalQuantity}
              </span>
            </p>

            <p>
              Subtotal
              <span className="order-summary-values">
                ₹{itemTotal}
              </span>
            </p>

            <p>
              Delivery
              <span className="order-summary-values">
                Calculated at checkout
              </span>
            </p>

            <hr />

            <h5>
              Total
              <span className="order-summary-values">
                ₹{itemTotal}
              </span>
            </h5>

            <button
              id="checkout_btn"
              className="btn btn-primary w-100"
              disabled={updating}
              onClick={checkout}
            >
              Proceed to checkout
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Cart;