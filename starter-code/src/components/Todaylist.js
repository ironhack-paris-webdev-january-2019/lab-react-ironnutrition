import React, { Component } from "react";
import "bulma/css/bulma.css";

class Todaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishCalories: parseInt(0)
    };
  }

  // processTodaysList() {
  //   this.props.handleNewTodayDish(
  //     this.props,
  //     this.state.quantity,
  //     this.state.dishCalories
  //   );
  // }

  render() {
    const { name, calories, quantity, dish } = this.props;
    this.state.dishCalories = calories * quantity;
    return (
      <li>
        {quantity} {name} = {this.state.dishCalories} cal |
        <button
          className="button is-info"
          onClick={() =>
            this.props.processDeleteTodaysList(dish, this.state.dishCalories)
          }
        >
          Delete
        </button>
      </li>
    );
  }
}

export default Todaylist;
