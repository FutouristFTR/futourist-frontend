import React, { Component } from "react";
import PropTypes from "prop-types";

class Tag extends Component {
  render() {
    return (
      <div className={`tag ${this.props.className}`} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}

Tag.propTypes = {
  onClick: PropTypes.func,
};

export default Tag;
