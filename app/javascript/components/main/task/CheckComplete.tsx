import React, { useState } from "react";

interface AppProps {
  completed: boolean;
  handleComplete: (e: React.MouseEvent) => void;
  ownsTask: boolean;
}

const CheckComplete = ({ completed, handleComplete, ownsTask }: AppProps) => {
  const [onHover, setOnHover] = useState(false);

  return (
    <i
      className={`far ${
        onHover != completed ? "fa-check-circle" : "fa-circle"
      } mx-2 ${ownsTask ? "text-dark" : "text-muted"}`}
      onMouseEnter={() => ownsTask && setOnHover(true)}
      onMouseLeave={() => ownsTask && setOnHover(false)}
      onClick={handleComplete}
    ></i>
  );
};

export default CheckComplete;
