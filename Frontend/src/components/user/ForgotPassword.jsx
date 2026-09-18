import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post(
        "/v1/users/password/forgot",
        { email }
      );

      toast.success(data.message || "Password reset link sent to your email");
      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to send password reset email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">Forgot Password</h2>

            <p className="text-muted text-center">
              Enter your email address and we will send you a password reset
              link.
            </p>

            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>

                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <div className="text-center mt-3">
              <Link to="/users/login">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}