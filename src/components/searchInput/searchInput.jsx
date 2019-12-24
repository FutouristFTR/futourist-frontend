import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import withSearchForm from "higherOrderComponents/withSearchForm";

import SearchInputView from "./searchInputView";

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDropdownOpened: false,
      loading: true,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
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

  handleClick = () => {
    if (!this.state.isDropdownOpened) {
      document.addEventListener("click", this.handleOutsideClick);
    } else {
      document.removeEventListener("click", this.handleOutsideClick);
    }

    this.setState({
      isDropdownOpened: false,
    });
  };

  handleInputClick = () => {
    document.addEventListener("click", this.handleOutsideClick);
    document.addEventListener("keypress", this.handleKeyClicked);

    this.setState({
      isDropdownOpened: true,
    });
  };

  handleOutsideClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClick();
  };

  handleScroll = () => {
    this.setState({ isDropdownOpened: false });
  };

  handleKeyClicked = event => {
    if (this.state.isDropdownOpened && event.keyCode === 13) {
      this.props.proceedToSearch();
      this.handleClick();
      document.getElementById("keywordInput").blur();
    }
  };

  render() {
    return (
      <div
        ref={node => {
          this.node = node;
        }}
        onScroll={this.handleScroll}
      >
        <SearchInputView
          collectionsRedux={this.props.collectionsRedux}
          handleChangeLocationSearch={this.props.handleChangeLocationSearch}
          handleInputClick={this.handleInputClick}
          handleLocationInputClick={this.props.handleLocationInputClick}
          isDropdownOpened={this.state.isDropdownOpened}
          keyword={this.props.search.params.keyword}
          locationInputFocused={this.props.locationInputFocused}
          searchParams={this.props.searchParams}
          selectedCategories={this.props.selectedCategories}
          setNewParams={this.props.setNewParams}
          setSearchUrl={this.props.setSearchUrl}
          shouldDisplay={this.props.shouldDisplay}
          suggestions={this.props.suggestions}
          proceedToSearch={() =>
            this.props.proceedToSearch(() => this.setState({ isDropdownOpened: false }))
          }
          handleClick={this.handleClick}
          loading={this.state.loading}
          loadingSearchResults={this.props.loadingSearchResults}
        />
      </div>
    );
  }
}

export default withRouter(withSearchForm(SearchInput));
