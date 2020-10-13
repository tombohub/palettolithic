import React, { useState } from "react";

function FrameworkList(props) {
  return (
    <>
      <li onClick={() => props.setActiveFramework("tailwind")}>
        tailwind
      </li>
      <li onClick={() => props.setActiveFramework("bootstrap")}>
        bootstrap
      </li>
    </>
  );
}

export default FrameworkList;
