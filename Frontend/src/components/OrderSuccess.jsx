import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../utils/api";

const OrderSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState(() => sessionId ? "Creating your order…" : "We could not verify this checkout session.");
  const orderRequested = useRef(false);

  useEffect(() => {
    if (!sessionId || orderRequested.current) return;
    orderRequested.current = true;
    api.post("/v1/eats/orders/new", { session_id: sessionId })
      .then(() => setState("Your order has been placed successfully."))
      .catch((error) => setState(error.response?.data?.message || "Payment succeeded, but we could not create your order. Please contact support."));
  }, [sessionId]);

  return <div className="container text-center mt-5"><h2>Thank you!</h2><p>{state}</p><Link to="/orders" className="btn btn-success mt-3">View my orders</Link></div>;
};

export default OrderSuccess;
