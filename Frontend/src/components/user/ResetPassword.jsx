import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.patch(
        `/v1/users/passwordreset/${token}`,
        {
          password,
          passwordConfirm,
        }
      );

      toast.success("Password reset successfully");

      // Backend sends a new JWT after reset.
      // Redirect the user to their profile/home page.
      if (data.success) {
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Password reset failed. The link may have expired."
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
            <h2 className="text-center mb-4">Reset Password</h2>

            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  New Password
                </label>

                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="passwordConfirm" className="form-label">
                  Confirm Password
                </label>

                <input
                  type="password"
                  id="passwordConfirm"
                  className="form-control"
                  placeholder="Confirm new password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  minLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
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