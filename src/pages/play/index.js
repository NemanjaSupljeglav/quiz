import React from "react";
import { useParams } from "react-router-dom";

function Play() {
  const { id } = useParams();
  return (
    <div>
      <h1>Play Page</h1>
      <h1>Play {id}</h1>
    </div>
  );
}

export default Play;
