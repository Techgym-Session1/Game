import React from "react";

const TextInput = ({ placeholderText, handleChange, target }) => {
  return (
    <input onChange={(e) => handleChange(target, e.target.value)} className="text-input" type="text" placeholder={placeholderText}></input>
  )
}
  
export default TextInput;
