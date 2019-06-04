import React, { Component } from "react";
import "bulma/css/bulma.css";

class FoodForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      name: "",
      calories: "",
      quantity: ""
    };
  }

  handleChange(event) {
    let { name, value } = event.target;
    if (name === "calories" || name === "quantity") {
      value = parseInt(value);
    }
    this.setState({ [name]: value });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.handleNewFoodInApp(this.state);
  }

  render() {
    return (
      <div>
        <form>
          <div class="field">
            <label class="label">Image:</label>
            <div class="control">
              <input
                class="input"
                type="text"
                name="image"
                placeholder="Image URL"
                onChange={e => {
                  this.handleChange(e);
                }}
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Name:</label>
            <div class="control">
              <input
                class="input"
                type="text"
                name="name"
                placeholder="Couscous"
                onChange={e => {
                  this.handleChange(e);
                }}
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Calories:</label>
            <div class="control">
              <input
                class="input"
                type="text"
                name="calories"
                placeholder="18000"
                onChange={e => {
                  this.handleChange(e);
                }}
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Quantity:</label>
            <div class="control">
              <input
                class="input"
                type="text"
                name="quantity"
                placeholder="1"
                onChange={e => {
                  this.handleChange(e);
                }}
              />
            </div>
          </div>

          <button onClick={food => this.handleFormSubmit(food)}>
            {" "}
            Ajouter
          </button>
        </form>
      </div>
    );
  }
}

export default FoodForm;
