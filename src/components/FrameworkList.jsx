import React, { useState } from "react";

function FrameworkList(props) {
  return (
    <>
      <li
        className="cursor-pointer"
        onClick={() => props.setActiveFramework("tailwind")}
      >
        tailwind
      </li>
      <li
        className="cursor-pointer"
        onClick={() => props.setActiveFramework("bootstrap")}
      >
        bootstrap
      </li>
    </>
  );
}

export default FrameworkList;
