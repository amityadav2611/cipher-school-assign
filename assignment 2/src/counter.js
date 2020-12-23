import React, { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [color, setcolor] = useState(1);

  const changeColor = () => {
    setcolor(Math.floor(Math.random() * 456));
  };

  return (
    <>
      <section id="counter">
        <div className="counterBox" style={{ background: `#${color}` }}>
          <h1>
            <span style={{ color: `#${color}` }}>{counter}</span>
          </h1>
        </div>
        <div
          className="buttonBox"
          style={{ background: `#${color}` }}
          onClick={() => changeColor()}
        >
          <button
            className="button"
            style={{ background: `#${color}` }}
            onClick={() => setCounter(counter + 1)}
          >
            +
          </button>
          <button
            className="button"
            style={{ background: `#${color}` }}
            onClick={() => setCounter(0)}
          >
            ↺
          </button>
          <button
            className="button"
            style={{ background: `#${color}` }}
            onClick={() => setCounter(counter - 1)}
          >
            -
          </button>
        </div>
        {}
      </section>
    </>
  );
};

export default Counter;
