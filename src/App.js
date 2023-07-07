import { useEffect, useState } from "react";

export default function app() {
  const [advice, setAdvice] = new useState("");
  const [count, setCount] = new useState(0);
  const [time, setTime] = new useState(new Date().toLocaleTimeString());
  new useEffect(function () {
    getAdvice();
  }, []);

  new useEffect(function () {
    setInterval(function () {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount(count + 1);
  }
  return (
    <div>
      <h1> {advice} </h1>
      <button onClick={getAdvice}> Get Advice </button>
      <Message count={count} />
      <TimeBoard time={time} />
    </div>
  );
}

function Message(props) {
  return (
    <p>
      You have read <strong>{props.count}</strong> pieces of advices{" "}
    </p>
  );
}

function TimeBoard(props) {
  return (
    <p>
      Current Time is: <strong>{props.time}</strong>
    </p>
  );
}
