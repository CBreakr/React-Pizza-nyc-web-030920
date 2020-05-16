import React from "react"

const Pizza = (props) => {
  return(
    <tr>
      <td>{props.topping}</td>
      <td>{props.size}</td>
      <td>{props.vegetarian ? "YES" : "NO"}</td>
      <td><button 
          type="button" 
          className="btn btn-primary"
          data-id={props.id}
          onClick={props.setCurrentPizza}
        >
          Edit Pizza
        </button></td>
    </tr>
  )
}

export default Pizza
