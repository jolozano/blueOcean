import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);

    // Initialize state.
    this.state = {};
  }

  componentDidMount() {
    fetch("/api/tweets")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  render() {
    return <div>My React MVP</div>;
  }
}
