import React, { useState } from "react";

interface AppProps {
  completed: boolean;
  handleComplete: (e: React.MouseEvent) => void;
  active: boolean;
}

const CheckComplete = ({ completed, handleComplete, active }: AppProps) => {
  const [onHover, setOnHover] = useState(false);

  return (
    <i
      className={`far ${
        onHover != completed ? "fa-check-circle" : "fa-circle"
      } mx-2 ${active ? "text-dark" : "text-muted"}`}
      onMouseEnter={() => active && setOnHover(true)}
      onMouseLeave={() => active && setOnHover(false)}
      onClick={(e) => active && handleComplete(e)}
    ></i>
  );
};

export default CheckComplete;
