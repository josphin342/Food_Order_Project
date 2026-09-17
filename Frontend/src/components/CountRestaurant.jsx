
import { useMemo } from "react";
import { useSelector } from "react-redux";
import "./css/count.css";

const CountRestaurant = () => {
  const { restaurants, count, loading, error, showVegOnly } = useSelector(
    (state) => state.restaurants
  );

  const vegCount = useMemo(
    () => restaurants.filter((restaurant) => restaurant.isVeg).length,
    [restaurants]
  );

  const displayCount = showVegOnly ? vegCount : count;

  return (
    <div>
      {loading ? (
        <p> Loading restaurant count...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p className="NumOfRestro">
          {displayCount}
          <span className="Restro">
            {displayCount === 1 ? " restaurant" : " restaurants"}
          </span>
        </p>
      )}
      <hr></hr>
    </div>
  );
};

export default CountRestaurant;
