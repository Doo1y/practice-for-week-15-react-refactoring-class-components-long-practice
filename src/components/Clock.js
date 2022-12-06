import { useEffect, useState } from "react";

export const ClockToggle = ({ toggleClock }) => {
  return (
    <button type="button" className="clock-toggle" onClick={toggleClock}>
      Toggle Clock
    </button>
  );
};

const Clock = () => {
  const [time, setTime] = useState(new Date());

  const tick = () => {
    setTime(new Date());
  };

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => {
      console.log("Clearing Interval before removing component!");
      clearInterval(interval);
    };
  }, []);

  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  const timezone = time
    .toTimeString() // Form: "14:39:07 GMT-0600 (PDT)"
    .replace(/[^A-Z]/g, "") // Strip out all but capitals
    .slice(3); // Eliminate initial GMT

  return (
    <section className="clock-section">
      <h1>Clock</h1>
      <div className="clock">
        <p>
          <span>Time:</span>
          <span>
            {hours}:{minutes}:{seconds} {timezone}
          </span>
        </p>
        <p>
          <span>Date:</span>
          <span>{time.toDateString()}</span>
        </p>
      </div>
    </section>
  );
};

export default Clock;
