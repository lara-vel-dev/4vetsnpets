import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

function Timer() {
  const { user } = UserAuth();
  const [percentage, setPercentage] = useState(0);
  const [progressImg, setProgressImg] = useState(
    "https://cdn.iconscout.com/icon/premium/png-256-thumb/male-pet-groomer-2100840-1763925.png"
  );
  const [progressTxt, setProgressTxt] = useState("Ready?");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const totalTime = 10;
  let timeLeft = time;

  function petProgress() {
    if (percentage > 0 && percentage < 45) {
      setProgressImg("https://cdn-icons-png.flaticon.com/512/3636/3636098.png");
      setProgressTxt("Your pet is getting a bath!");
    } else if (percentage >= 45 && percentage < 70) {
      setProgressImg("https://cdn-icons-png.flaticon.com/512/2991/2991557.png");
      setProgressTxt("Your pet is getting a haircut!");
    } else if (percentage >= 70 && percentage < 100) {
      setProgressImg(
        "https://cdn0.iconfinder.com/data/icons/pet-grooming-hazel-vol-1/256/Pet-perfume-512.png"
      );
      setProgressTxt("Your pet is almost done!");
    } else if (percentage == 100) {
      setProgressImg("https://cdn-icons-png.flaticon.com/512/5569/5569626.png");
      setProgressTxt("Your pet is ready to go!");
    }
  }

  useEffect(() => {
    if (percentage < 101 && isRunning) {
      petProgress();
      setTimeout(() => setPercentage((prev) => (prev += 2)), 200);
    }
  }, [percentage, isRunning]);

  return (
    <div className="timer">
      <div className="txt-container">
        <img src={progressImg} alt="Progress image" className="pg-image" />
        <p>{progressTxt}</p>
      </div>
      <div className="pg-container">
        <input
          type="range"
          className="progress"
          style={{ width: `${percentage}%` }}
          min="1"
          max="100"
          value={percentage}
        />
      </div>
      <div className="btn-container">
        <button
          style={user.rol === "user" ? { display: "none" } : {}}
          onClick={() => setIsRunning(true)}
        >
          Start!
        </button>
      </div>
    </div>
  );
}

export default Timer;
