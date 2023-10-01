import React, { useState } from "react";
import { useEffect } from "react";
const Time = () => {
  const [time, setTime] = useState(0);
  
  const count=()=> {
    setTime(time + 1);
  }
  
  const stop = () => {
    setTime(0);
  };

  useEffect(() => {
    console.log("time: "+time);
    document.title = `You clicked ${time} times`;
  });
  return (
    <div>
      <h1> לחצת {time} פעמים</h1>
      <button onClick={count}>לחץ עלי</button>
      <button onClick={stop}>איפוס</button><br></br>
    </div>
  );
};
export default Time;
