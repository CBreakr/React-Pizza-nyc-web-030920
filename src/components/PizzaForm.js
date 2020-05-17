import React from "react"

class PizzaForm extends React.Component {

  constructor(){
    super();
    this.state = {
      id: null,
      topping: "",
      size: "",
      vegetarian: false
    };
    this.myRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.id !== prevProps.id){
      this.setState({
        id: this.props.id,
        topping: this.props.topping,
        size: this.props.size,
        vegetarian: this.props.vegetarian
      });
      this.myRef.current.focus();
    }
  }

  onInputChange = (event) => {
    console.log("input change", event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onRadioChange = (event) => {
    this.setState({
      vegetarian: event.target.value === "Vegetarian"
    });
  }

  updatePizza = () => {
    this.props.patchPizza(this.state);

    this.setState({
      id: null,
      topping: "",
      size: "",
      vegetarian: false
    });
  }

  render() {

    console.log("form props", this.props);
    console.log("form state", this.state);

    return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" name="topping" placeholder="Pizza Topping" 
              value={
                //Pizza Topping Should Go Here
                this.state.topping
              }
              ref={this.myRef}
              onChange={this.onInputChange}
              />
        </div>
        <div className="col">
          <select value={this.state.size} className="form-control" name="size" onChange={this.onInputChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Vegetarian" group="vegetarian" 
              checked={this.state.vegetarian}
              onChange={this.onRadioChange}
            />
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Not Vegetarian" group="vegetarian" 
              checked={!this.state.vegetarian}
              onChange={this.onRadioChange}
            />
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={this.updatePizza}>Submit</button>
        </div>
      </div>
    )
  }
}

export default PizzaForm
