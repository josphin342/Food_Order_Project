import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../utils/api";
import Loader from "./layout/Loader";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/v1/eats/stores/${id}`)
      .then(({ data }) => setRestaurant(data.data))
      .catch((requestError) => setError(requestError.response?.data?.message || "Could not load this restaurant."));
  }, [id]);

  if (error) return <div className="alert alert-danger mt-4">{error}</div>;
  if (!restaurant) return <Loader />;

  return <main className="restaurant-details container mt-4">
    <section className="restaurant-hero shadow-sm">
      <img src={restaurant.images?.[0]?.url || "/images/placeholder.png"} alt={restaurant.name} />
      <div>
        <span className={`badge ${restaurant.isVeg ? "bg-success" : "bg-secondary"}`}>{restaurant.isVeg ? "Pure Veg" : "Veg & Non-veg"}</span>
        <h1>{restaurant.name}</h1>
        <p className="mb-1">{restaurant.address}</p>
        <p className="mb-4"><strong>★ {restaurant.ratings?.toFixed(1) || "0.0"}</strong> · {restaurant.numOfReviews || 0} reviews</p>
        <Link className="btn btn-success" to={`/eats/stores/${restaurant._id}/menu`}>View menu</Link>
      </div>
    </section>

    <section className="mt-5">
      <h2>Customer reviews</h2>
      {restaurant.reviews?.length ? <div className="row">
        {restaurant.reviews.map((review, index) => <div className="col-md-6 my-2" key={`${review.name}-${index}`}>
          <article className="review-card"><strong>{review.name}</strong><span className="float-end text-warning">★ {review.rating}/5</span><p className="mb-0 mt-2">{review.Comment}</p></article>
        </div>)}
      </div> : <p className="text-muted">No reviews yet. Be the first to order and review this restaurant.</p>}
    </section>
  </main>;
};

export default RestaurantDetails;
