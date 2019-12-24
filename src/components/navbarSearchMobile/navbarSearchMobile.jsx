import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import withSearchForm from "higherOrderComponents/withSearchForm";

import NavbarSearchMobileView from "./navbarSearchMobileView";

class NavbarSearchMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpen: false,
      loading: true,
    };
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.collectionsRedux.fetchStatus.categories === "DONE") {
      return {
        loading: false,
      };
    }
    return null;
  }

  closeDropdown = () => {
    this.setState({ isDropdownOpen: false });
    document.removeEventListener("click", this.handleOutsideClick);
  };

  handleClick = () => {
    if (!this.state.isDropdownOpen) {
      document.addEventListener("click", this.handleOutsideClick);
    } else {
      document.removeEventListener("click", this.handleOutsideClick);
    }
  };

  handleInputClick = () => {
    document.addEventListener("click", this.handleOutsideClick);

    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen,
    });
  };

  handleOutsideClick = e => {
    if (this.node.contains(e.target)) {
      return;
    } else {
      this.setState({
        isDropdownOpen: false,
      });
    }

    this.handleClick();
  };

  render() {
    return (
      <div
        ref={node => {
          this.node = node;
        }}
      >
        <NavbarSearchMobileView
          handleInputClick={this.handleInputClick}
          collectionsRedux={this.props.collectionsRedux}
          openDropdown={this.openDropdown}
          handleLocationInputClick={this.props.handleLocationInputClick}
          isDropdownOpen={this.state.isDropdownOpen}
          keyword={this.props.search.params.keyword}
          locationInputFocused={this.props.locationInputFocused}
          searchParams={this.props.searchParams}
          selectedCategories={this.props.selectedCategories}
          setNewParams={this.props.setNewParams}
          setSearchUrl={this.props.setSearchUrl}
          shouldDisplay={this.props.shouldDisplay}
          suggestions={this.props.suggestions}
          proceedToSearch={() =>
            this.props.proceedToSearch(() => this.setState({ isDropdownOpen: false }))
          }
          handleClick={this.handleClick}
          loading={this.state.loading}
          closeDropdown={this.closeDropdown}
          loadingSearchResults={this.props.loadingSearchResults}
        />
      </div>
    );
  }
}

export default withRouter(withSearchForm(NavbarSearchMobile));
