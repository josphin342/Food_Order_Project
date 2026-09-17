import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader";
import { logout } from "../../redux/actions/userAction";
import { resetCart } from "../../redux/slices/cartSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.user);

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(resetCart());
    navigate("/");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="profile-page">

          <div className="profile-card">

            {/* Decorative leaf */}
            <div className="profile-decoration top-decoration">
              🌿
            </div>

            {/* Profile Header */}
            <div className="profile-header">

              <figure className="avatar-profile">
                <img
                  src={user?.avatar?.url}
                  alt={user?.name}
                />
              </figure>

              <div className="profile-welcome">
                <p>Welcome back,</p>
                <h1>{user?.name}</h1>
              </div>

            </div>

            {/* Divider */}
            <div className="profile-divider">
              <span>✦</span>
            </div>

            {/* Quote */}
            <div className="profile-quote">
              “Healthy food makes a happy you.”
            </div>

            {/* Profile Details */}

            <div className="profile-detail">

              <div className="detail-icon">
                <span className="material-symbols-outlined">
                  person
                </span>
              </div>

              <div className="detail-content">
                <h4>Full Name</h4>
                <p>{user?.name}</p>
              </div>

            </div>

            <div className="profile-detail">

              <div className="detail-icon">
                <span className="material-symbols-outlined">
                  mail
                </span>
              </div>

              <div className="detail-content">
                <h4>Email Address</h4>
                <p>{user?.email}</p>
              </div>

            </div>

            <div className="profile-detail">

              <div className="detail-icon">
                <span className="material-symbols-outlined">
                  calendar_month
                </span>
              </div>

              <div className="detail-content">
                <h4>Joined On</h4>
                <p>
                  {String(user?.createdAt).substring(0, 10)}
                </p>
              </div>

            </div>

            {/* Edit Profile */}

            <Link
              to="/users/me/update"
              id="edit_profile"
              className="profile-edit-btn"
            >
              <span className="material-symbols-outlined">
                edit
              </span>

              Edit Profile
            </Link>

            {/* Logout */}

            <button
              type="button"
              className="profile-logout-btn"
              onClick={handleLogout}
            >
              <span className="material-symbols-outlined">
                logout
              </span>

              Logout
            </button>

            {/* Bottom decoration */}
            <div className="profile-footer">
              <span>🌱</span>
              <p>Eat Healthy&nbsp; • &nbsp;Stay Happy&nbsp; • &nbsp;OrderIt</p>
            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default Profile;