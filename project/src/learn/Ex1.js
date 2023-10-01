import { useEffect, useState } from "react";
import "./styleEx1.css";
import React from "react";
import CH from "./CH";
export default function Ex1() {
  let nameAdd = "";
  let idAdd = "";
  const [time, setTime] = useState(0);
  const [colorSelected, setColorSelected] = useState("black");
  const [man, setMan] = useState([
    { name: "chagit", id: "1" },
    { name: "tehilla", id: "2" },
    { name: "rony", id: "3" },
  ]);
  const colorList = ["red", "green"];
  const t = () => {
    setTime(time + 1);
  };
  const add = () => {
    man.push({ name: nameAdd, id: idAdd });
    let newArr = [...man];
    setMan(newArr);
  };
  useEffect(() => {
    console.log("useEffect");
  }, [man]);

  return (
    <>
      <button onClick={() => setMan(man.slice(0, man.length - 1))}>-</button>
      <button onClick={add}>+</button>
      <table>
        <tr>
          <th>name</th>
          <th>id</th>
        </tr>
        {man.map((e) => (
          <tr>
            <td>{e.name}</td>
            <td>{e.id}</td>
          </tr>
        ))}
      </table>
      <div>
        <input
          onChange={(e) => (nameAdd = e.target.value)}
          placeholder="name"
        />
        <input
          onChange={(e) => {
            idAdd = e.target.value;
          }}
          placeholder="id"
        />
        {man.length>4 && <h1>hello</h1>}
        <CH></CH>
      </div>
    </>
  );
}
