import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCartItem } from "../redux/slices/cartSlice";
import ConfirmDialog from "./ConfirmDialog";

const Fooditem = ({ fooditem, restaurant }) => {
  const dispatch = useDispatch();

  const cartRestaurantId = useSelector(
    (state) => state.cart.cart?.restaurant?._id
  );

  const [showConfirm, setShowConfirm] = useState(false);

  const addItem = async () => {
    try {
      await dispatch(
        addCartItem({
          foodItemId: fooditem._id,
          restaurantId: restaurant,
        })
      ).unwrap();

      toast.success(`${fooditem.name} added to cart`);
    } catch (error) {
      toast.error(error);
    }
  };

  const addToCartHandler = () => {
    if (cartRestaurantId && cartRestaurantId !== restaurant) {
      setShowConfirm(true);
      return;
    }

    addItem();
  };

  const confirmNewCart = () => {
    setShowConfirm(false);
    addItem();
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="food-card">

        {/* Food Image */}
        <img
          className="food-card-image"
          src={
            fooditem.images?.[0]?.url ||
            "/images/placeholder.png"
          }
          alt={fooditem.name}
        />

        <div className="food-card-body">

          {/* Food Name */}
          <h5 className="food-card-title">
            {fooditem.name}
          </h5>

          {/* Description */}
          <p className="food-card-description">
            {fooditem.description}
          </p>

          {/* Price */}
          <p className="food-card-price">
            <FontAwesomeIcon
              icon={faIndianRupeeSign}
              size="xs"
            />{" "}
            {fooditem.price}
          </p>

          {/* Add To Cart */}
          <button
            type="button"
            className="food-card-cart-btn"
            disabled={fooditem.stock === 0}
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>

          {/* Divider */}
          <hr className="food-card-divider" />

          {/* Stock Status */}
          <p className="food-card-status">
            Status:{" "}
            <span
              className={
                fooditem.stock > 0
                  ? "greenColor"
                  : "redColor"
              }
            >
              {fooditem.stock > 0
                ? "In Stock"
                : "Out of Stock"}
            </span>
          </p>
        </div>
      </div>

      <ConfirmDialog
        show={showConfirm}
        title="Start a new cart?"
        message="Your cart contains items from another restaurant. Adding this item will replace your current cart."
        confirmLabel="Start new cart"
        cancelLabel="Keep current cart"
        onConfirm={confirmNewCart}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default Fooditem;