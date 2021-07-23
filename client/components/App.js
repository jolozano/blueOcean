import React, { Component } from "react";
import PhaseBar from './PhaseBar'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={"wrapper"}>
        <PhaseBar />
      </div>
    ) 
  }
}
