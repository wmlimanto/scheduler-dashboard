import React, { Component } from "react";

import classnames from "classnames";
import Loading from "./Loading";
import Panel from "./Panel";

const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      focused: null
    };
    
    this.selectPanel = this.selectPanel.bind(this);
  }

  selectPanel(id) {
    this.setState((prevState) => ({
      focused: prevState.focused !== null ? null : id
    }));
  }

  render() {
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
     });

    if (this.state.loading) {
      return <Loading />;
    }

    // map over the data array and create a new Panel for each of the four data objects, then filter panel data before converting it to components
    const panels = (
      this.state.focused 
        ? data.filter((panel) => this.state.focused === panel.id) 
        : data
    ).map((panel) => {
      return <Panel
        key={panel.id}
        id={panel.id}
        label={panel.label}
        value={panel.value}
        onSelect={event => this.selectPanel(panel.id)}
      />
    });

    return <main className={dashboardClasses}>{panels}</main>;
  }
}

export default Dashboard;
