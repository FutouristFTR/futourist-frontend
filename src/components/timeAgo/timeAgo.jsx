import React, { Component } from "react";

function makeTimeAgo(timestamp) {
  const currentTime = Math.floor(new Date().getTime() / 1000);
  const diffSeconds = currentTime - timestamp.getTime() / 1000;

  if (diffSeconds < 60)
    // less than 1 min
    return "Now";
  else if (diffSeconds < 60 * 60)
    // less than 1 hour
    return Math.floor(diffSeconds / 60).toString() + "m";
  else if (diffSeconds < 60 * 60 * 24)
    // less than 1 day
    return Math.floor(diffSeconds / 60 / 60).toString() + "h";
  else if (diffSeconds < 60 * 60 * 24 * 7)
    // less than 1 week
    return Math.floor(diffSeconds / 60 / 60 / 24).toString() + "d";
  // more than 1 week
  else return Math.floor(diffSeconds / 60 / 60 / 24 / 7).toString() + "w";
}

class TimeAgo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdTimestamp: props.createdTimestamp,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.createdTimestamp !== prevState.createdTimestamp)
      return { createdTimestamp: nextProps.createdTimestamp };
    return null;
  }

  render() {
    return <span className="timeAgo">{makeTimeAgo(this.state.createdTimestamp)}</span>;
  }
}

export default TimeAgo;
