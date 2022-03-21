import React from "react";

const StartGameButton = ({ handleClick, disabled }) => {
  return (
    <button onClick={() => handleClick()} className="button" disabled={disabled}>Start Game</button>
  );
}

StartGameButton.defaultProps = {
  handleClick: () => {},
}

export default StartGameButton;
