import React, { Component } from "react";
import SingleOutfitNavView from "./singleOutfitNavView";
import SingleOutfitDayPart from "components/singleOutfitDayPart/singleOutfitDayPart";

class SingleOutfitNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "",
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let morning = document.getElementById("morningAnchor").getBoundingClientRect().top;

    let day = document.getElementById("dayAnchor").getBoundingClientRect().top;

    let evening = document.getElementById("eveningAnchor").getBoundingClientRect().top;

    if (morning < 120 && day > 120 && evening > 120) {
      this.setState({ active: "morningAnchor" });
    } else if (morning < 120 && day < 120 && evening > 120) {
      this.setState({ active: "dayAnchor" });
    } else if (morning < 120 && day < 120 && evening < 120) {
      this.setState({ active: "eveningAnchor" });
    }
    return null;
  };

  renderOutfitNavBar = () => {
    let links = [
      {
        label: "Morning",
        icon: "morning",
        link: "morningAnchor",
      },
      {
        label: "Day",
        icon: "day",
        link: "dayAnchor",
      },
      {
        label: "Evening",
        icon: "evening",
        link: "eveningAnchor",
      },
    ];

    return links.map((link, index) => {
      return (
        <li
          className={`outfitNavListItem ${
            this.state.active === link.link ? "activeNavButton" : "inactiveNavButton"
          }
        `}
          key={index}
          onClick={() => {
            const dayPart =
              document.getElementById(link.link).getBoundingClientRect().top + window.pageYOffset;

            const yOffset = -65;

            window.scrollTo({
              top: dayPart + yOffset,
              behavior: "smooth",
            });
          }}
        >
          <img
            src={
              this.state.active === link.link
                ? "/assets/outfits/" + link.icon + "Active.svg"
                : "/assets/outfits/" + link.icon + ".svg"
            }
            alt={"Outfit" + link.icon + "icon"}
            className="outfitNavIconStyle"
          />
          {link.label}
        </li>
      );
    });
  };

  render() {
    return (
      <SingleOutfitNavView renderOutfitNavBar={this.renderOutfitNavBar()}>
        <SingleOutfitDayPart
          id="morningAnchor"
          title="Morning"
          dayPart={this.props.outfit.morning}
          collections={this.props.collections}
        />

        <SingleOutfitDayPart
          id="dayAnchor"
          title="Day"
          dayPart={this.props.outfit.day}
          collections={this.props.collections}
        />
        <SingleOutfitDayPart
          id="eveningAnchor"
          title="Evening"
          dayPart={this.props.outfit.evening}
          collections={this.props.collections}
        />
      </SingleOutfitNavView>
    );
  }
}

export default SingleOutfitNav;
