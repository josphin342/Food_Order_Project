import { Link } from "react-router-dom";
import Search from "./Search";
import "../../App.css";
import { useSelector } from "react-redux";

const Header = () => {
  const count = useSelector(
    (state) =>
      state.cart.cart?.items?.reduce(
        (total, item) => total + item.quantity,
        0
      ) || 0
  );

  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <nav className="navbar sticky-top custom-navbar">

      {/* Logo */}
      <div className="header-logo">
        <Link to="/">
          <img
            src="/images/logo.webp"
            alt="OrderIt"
            className="logo"
          />
        </Link>
      </div>

      {/* Search */}
      <div className="header-search">
        <Search />
      </div>

      {/* Right Navigation */}
      <div className="header-actions">

        {isAuthenticated ? (
          <>
            {/* Cart */}
            <Link to="/cart" className="nav-action cart-action">
              <span className="material-symbols-outlined">
                shopping_cart
              </span>

              <span className="nav-text">Cart</span>

              <span id="cart_count">
                {count}
              </span>
            </Link>

            {/* My Orders */}
            <Link to="/orders" className="nav-action">
              <span className="material-symbols-outlined">
                receipt_long
              </span>

              <span className="nav-text">
                My Orders
              </span>
            </Link>

            {/* Admin */}
            {user?.role === "admin" && (
              <Link to="/admin/orders" className="nav-action">
                <span className="material-symbols-outlined">
                  admin_panel_settings
                </span>

                <span className="nav-text">
                  Admin
                </span>
              </Link>
            )}

            {/* Profile */}
            <Link
              to="/users/me"
              className="nav-action profile-nav-action"
            >
              <span className="material-symbols-outlined">
                account_circle
              </span>

              <span className="nav-text">
                My Profile
              </span>
            </Link>
          </>
        ) : (
          <Link
            to="/users/login"
            className="material-symbols-outlined login-icon"
          >
            account_circle
          </Link>
        )}

      </div>
    </nav>
  );
};

export default Header;