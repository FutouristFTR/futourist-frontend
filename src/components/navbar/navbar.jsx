import React from "react";
import { Link } from "react-router-dom";

import routes from "constants/routes";
import UserDropdown from "components/userDropdown";

const Navbar = () => (
  <div className="navbar">
    <div className="navbarLeft">
      <Link to={routes.HOME}>
        <img alt="Futourist logo" className="navbarLogo" src="assets/logo.svg" />
      </Link>
      <Link className="navbarLink" to="/search?&sorting=relevance&content=places">
        Places
      </Link>
      <Link className="navbarLink" to="/search?&sorting=relevance&content=outfits">
        Travel outfits
      </Link>
      <Link className="navbarLink" to="/search?&sorting=relevance&content=bundles">
        Collections
      </Link>
    </div>

    <div className="navbarRight">
      <UserDropdown />
    </div>
  </div>
);

export default Navbar;
