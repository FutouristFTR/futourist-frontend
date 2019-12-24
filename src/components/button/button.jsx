import React from "react";
import PropTypes from "prop-types";

const Button = props => (
  <button onClick={props.onClick} className={props.className} disabled={props.disabled}>
    {props.children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
