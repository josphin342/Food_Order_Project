import axios from "axios";

export const addToCart = (foodItemId, restaurantId, quantity) => async (dispatch) => {
  const { data } = await axios.post(
    "http://localhost:8000/api/v1/eats/cart/add-to-cart",
    {
      foodItemId,
      restaurantId,
      quantity,
    },
    { withCredentials: true }
  );

  dispatch({ type: "CART_ADD_SUCCESS", payload: data.cart });
};