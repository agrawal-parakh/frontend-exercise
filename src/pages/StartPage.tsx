import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const [boardSize, setBoardSize] = useState("4x4");

  const handleStart = () => {
    if (!playerName) return alert("Enter your name");
    navigate("/game", { state: { playerName, boardSize } });
  };

  return (
    <div className="start-container">
      <h1 className="start-title">Memory Game</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="start-input"
      />

      <select
        value={boardSize}
        onChange={(e) => setBoardSize(e.target.value)}
        className="start-select"
      >
        <option value="2x2">2x2</option>
        <option value="4x4">4x4</option>
        <option value="6x6">6x6</option>
      </select>

      <button onClick={handleStart} className="start-button">
        Start Game
      </button>
    </div>
  );
};

export default StartPage;
