import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

const WeeksView = () => {
  const { weeks } = useContext(DataContext);
  return <div>{weeks && weeks.map((week) => <div>{week.date}</div>)}</div>;
};

export default WeeksView;
