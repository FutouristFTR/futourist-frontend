import React from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

import withLoginForm from "higherOrderComponents/withLoginForm";

import SearchInput from "components/searchInput";
import routes from "constants/routes";
import UserDropdown from "components/userDropdown";
import NavbarSearchMobile from "components/navbarSearchMobile";

const isNotHomeView = pathname => pathname !== routes.HOME;

const NavbarFixed = ({ location, shouldDisplay }) => (
  <div
    className={`navbarFixed${
      isNotHomeView(location.pathname) || shouldDisplay ? "" : " navbarFixedHidden"
    }`}
  >
    <div className="navbarLeft">
      <Link to={routes.HOME} className="navbarFixedLogoLink">
        <img alt="Futourist logo" src="/assets/logoColor.svg" className="navbarLogoFixed" />
      </Link>
      <SearchInput shouldDisplay={shouldDisplay} />
    </div>

    <div className="navbarRight">
      <Link className="navbarLink" to="/search?&sorting=relevance&content=places">
        Places
      </Link>
      <Link className="navbarLink" to="/search?&sorting=relevance&content=outfits">
        Travel outfits
      </Link>
      <Link className="navbarLink" to="/search?&sorting=relevance&content=bundles">
        Collections
      </Link>

      <NavbarSearchMobile />
      <UserDropdown shouldDisplay={shouldDisplay} />
    </div>
  </div>
);

NavbarFixed.propTypes = {
  location: PropTypes.object,
  shouldDisplay: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  signOut: PropTypes.func,
  openLoginModal: PropTypes.func,
};

export default withRouter(withLoginForm(NavbarFixed));
