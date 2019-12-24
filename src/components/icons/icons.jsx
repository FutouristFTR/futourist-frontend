import React from "react";
import PropTypes from "prop-types";

import icons from "constants/parsedIcons.json";

const Icon = ({ size, name, color, onClick, className, onMouseEnter, onMouseLeave }) => (
  <svg
    className={className}
    height={size}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    viewBox="0 0 1024 1024"
    width={size}
  >
    <path d={icons[name]} fill={color} />
  </svg>
);

Icon.defaultProps = {
  color: "#2ac7d3",
  name: "star",
  size: 22,
};

Icon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  name: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Icon;
