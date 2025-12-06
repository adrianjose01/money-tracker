import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import Week from "./Week";

const WeeksView = () => {
  const { weeks, deleteWeek } = useContext(DataContext);
  return (
    <div>
      {weeks &&
        weeks.map((week) => (
          <Week key={week.id} week={week} deleteWeek={deleteWeek} />
        ))}
    </div>
  );
};

export default WeeksView;
