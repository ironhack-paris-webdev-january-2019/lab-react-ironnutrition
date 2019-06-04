import React, { Component } from "react";
import "./App.css";
import "bulma/css/bulma.css";
import foods from "./foods.json";
import FoodBox from "./components/FoodBox";
import FoodForm from "./components/FoodForm";
import Todaylist from "./components/Todaylist";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listFoods: foods,
      displayForm: false,
      searchText: "",
      todaylist: [],
      totalCalories: parseInt(0)
    };
  }

  toggleForm() {
    this.setState({ displayForm: !this.state.displayForm });
  }

  addNewFood(food) {
    const newTodayFoodList = [...this.state.todaylist];
    newTodayFoodList.push(food);
    const newFoodList = [...this.state.listFoods];
    newFoodList.push(food);
    // this.state.listFoods.push(food);
    this.setState({
      todaylist: newTodayFoodList,
      listFoods: newFoodList,
      displayForm: false,
      totalCalories: parseInt(food.calories * food.quantity)
    });
  }
  // addNewFood(food) {
  //   this.state.listFoods.push(food);
  //   this.setState({ listFoods: this.state.listFoods, displayForm: false });
  // }

  searchFilterFood(food) {
    return food.name
      .toLowerCase()
      .includes(this.state.searchText.toLowerCase());
  }

  addTodaysList(dish, dishCalories, q) {
    q = parseInt(q) || 1;
    let { name, calories } = dish;
    if (this.state.todaylist.map(e => e.name).includes(name)) {
      this.state.todaylist.forEach(dish => {
        if (dish.name === name) dish.quantity += q;
        console.log("dish calories", dishCalories);
        this.setState({
          totalCalories: this.state.totalCalories + dishCalories
        });
      });
    } else {
      let newFoodList = [...this.state.todaylist];
      newFoodList.push({
        name,
        quantity: dish.quantity + q,
        calories
      });
      this.setState({
        todaylist: newFoodList,
        totalCalories: this.state.totalCalories + dishCalories
      });
    }
  }

  deleteTodaysList(dish) {
    const filtered = this.state.todaylist.filter(o => {
      return o.name != dish.name;
    });
    this.setState({
      todaylist: filtered,
      totalCalories: this.state.totalCalories - dish.calories * dish.quantity
    });
  }

  render() {
    return (
      <div className="App">
        <div class="container">
          <h1 class="title">IronNutrition</h1>
          <div class="columns">
            <div class="column">
              <div>
                <input
                  type="text"
                  class="input search-bar"
                  name="search"
                  placeholder="Search"
                  onChange={e => this.setState({ searchText: e.target.value })}
                />
              </div>
              <a class="button" isSuccess onClick={this.toggleForm.bind(this)}>
                {this.state.displayForm ? "Hide food form" : "Show food form"}
              </a>
              {this.state.listFoods
                .filter(this.searchFilterFood.bind(this))
                .map(food => {
                  return (
                    <FoodBox
                      key={food.name}
                      name={food.name}
                      calories={food.calories}
                      dishCalories={food.dishCalories}
                      image={food.image}
                      quantity={food.quantity}
                      handleNewTodayDish={this.addTodaysList.bind(this)}
                    />
                  );
                })}
            </div>
            <div class="column content">
              <h2 class="subtitle">Today's foods</h2>
              <ul>
                {this.state.todaylist.map(dish => {
                  return (
                    <Todaylist
                      dish={dish}
                      key={dish.name}
                      name={dish.name}
                      calories={dish.calories}
                      quantity={dish.quantity}
                      dishCalories={dish.dishCalories}
                      processDeleteTodaysList={this.deleteTodaysList.bind(this)}
                    />
                  );
                })}
              </ul>
              <strong>Total:</strong>
              {/* {this.state.todaylist.map(el => {
                return <p>{el.calories}</p>;
              })} */}
              {this.state.totalCalories}

              {this.state.displayForm ? (
                <FoodForm handleNewFoodInApp={food => this.addNewFood(food)} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
