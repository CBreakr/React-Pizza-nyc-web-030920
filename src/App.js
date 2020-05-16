import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    currentPizzaId: null
  }

  componentDidMount(){
    // fetch the pizzas
    this.fetchPizzas();
  }

  fetchPizzas = () => {
    fetch("http://localhost:3000/pizzas")
    .then(res => res.json())
    .then(data => {
      this.setState({pizzas: data});
    })
    .catch(err => console.error("err", err));
  }

  setCurrentPizza = (event) => {
    console.log("set pizza", event.target.dataset.id);
    if(event.target.dataset.id){
      this.setState({currentPizzaId: event.target.dataset.id});
    }
  }

  patchPizza = (pizza) => {

    console.log("patch pizza", pizza);

    fetch(`http://localhost:3000/pizzas/${this.state.currentPizzaId}`, {
      method:"PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(pizza)
    })
    .then(res => res.json())
    .then(data => {
      this.fetchPizzas();
    })
    .catch(err => console.error("err", err));
  }

  findCurrentPizza = () => {
    if(this.state.currentPizzaId){
      // allow for breaking out of loop early
      for(let i = 0; i < this.state.pizzas.length; i++){
        const nextPizza = this.state.pizzas[i];
        // I'm not going to do an extra conversion anywhere for the sake of this
        if(nextPizza.id == this.state.currentPizzaId){
          return nextPizza;
        }
      }
    }
    return {
      id: null,
      topping: "",
      size: null,
      vegetarian: false
    };
  }

  render() {

    const currentPizza = this.findCurrentPizza();
    console.log("current pizza", currentPizza);

    return (
      <Fragment>
        <Header/>
        <PizzaForm {...currentPizza} patchPizza={this.patchPizza}/>
        <PizzaList pizzas={this.state.pizzas} setCurrentPizza={this.setCurrentPizza}/>
      </Fragment>
    );
  }
}

export default App;
