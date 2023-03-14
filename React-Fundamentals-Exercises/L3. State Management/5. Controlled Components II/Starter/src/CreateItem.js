import { useState } from "react";
import PropTypes from "prop-types";

const CreateItem = ({ onAddItem }) =>{
    const [value,setValue]  =  useState("")

    const handleChange = (event) =>{
        setValue(event.target.value)
    }
    const addItem = (event) => {
        event.preventDefault();
        onAddItem(value);
        setValue("");
      };
    

    return (
        <div>
        <form onSubmit={addItem}>
        <input
          type="text"
          placeholder="Enter New Item"
          value={value}
          onChange={handleChange}
        />
        <button disabled={(value ==="")} >Add</button>
      </form>
      </div>
      );
    

}
CreateItem.propTypes = {
    OnAddItem: PropTypes.func.isRequired,
};

export default CreateItem;