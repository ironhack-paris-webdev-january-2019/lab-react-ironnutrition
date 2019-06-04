import React, { Component } from "react";
import "bulma/css/bulma.css";

class FoodBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      dishCalories: parseInt(0)
    };
  }
  handleChange(event) {
    const dishCalories = event.target.value * this.props.calories;
    this.setState({
      quantity: event.target.value,
      dishCalories: dishCalories
    });
    console.log("FoodBox", this.props);
  }

  processTodaysList() {
    this.props.handleNewTodayDish(
      this.props,
      this.state.dishCalories,
      this.state.quantity
    );
  }

  render() {
    return (
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={this.props.image} />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{this.props.name}</strong> <br />
                <small>{this.props.calories}</small>
              </p>
            </div>
          </div>
          <div className="media-right">
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input"
                  type="number"
                  onChange={q => {
                    this.handleChange(q);
                  }}
                />
              </div>
              <div className="control">
                <button
                  className="button is-info"
                  onClick={() => this.processTodaysList()}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default FoodBox;
