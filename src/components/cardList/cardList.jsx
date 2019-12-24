import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "components/button/button";

const CardList = ({
  buttonAction,
  buttonText,
  children,
  linkText,
  linkPath,
  listDescription,
  listTitle,
  noGutters,
}) => (
  <section className="cardListContainer">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="cardListTitleContainer">
            <h4>{listTitle}</h4>
          </div>
          {listDescription ? <p className="cardListDescription">{listDescription}</p> : null}
        </div>
      </div>
      <div className={noGutters ? "row no-gutters" : "row"}>{children}</div>
      <div className="row">
        <div className="col-12">
          {linkPath && linkText ? (
            <Link className="showAllLink" to={linkPath}>
              {linkText}
            </Link>
          ) : null}
          {buttonAction && buttonText ? (
            <Button className="cardListButton" onClick={buttonAction}>
              {buttonText}
            </Button>
          ) : null
          // <Button className="emptyDisabledButton" disabled>
          //   Load more disabled
          // </Button>
          }
        </div>
      </div>
    </div>
  </section>
);

CardList.defaultProps = {
  listDescription: "",
  listTitle: "",
  noGutters: false,
};

CardList.propTypes = {
  buttonAction: PropTypes.func,
  buttonText: PropTypes.string,
  linkText: PropTypes.string,
  linkPath: PropTypes.string,
  listDescription: PropTypes.string,
  listTitle: PropTypes.string,
  noGutters: PropTypes.bool,
};

export default CardList;
