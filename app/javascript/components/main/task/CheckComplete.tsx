import React, { useState } from "react";

interface AppProps {
  completed: boolean;
  handleComplete: (e: React.MouseEvent) => void;
}

const CheckComplete = ({ completed, handleComplete }: AppProps) => {
  const [onHover, setOnHover] = useState(false);

  return (
    <i
      className={`far ${
        onHover != completed ? "fa-check-circle" : "fa-circle"
      } mx-2`}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      onClick={handleComplete}
    ></i>
  );
};

export default CheckComplete;
