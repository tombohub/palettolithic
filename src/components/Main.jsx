import React from "react";
import Form from "./Form";
import Palette from "./Palette";
import Menu from "./Menu";
import Code from "./Code";

/**
 * Main component that displays the first page with form and palette
 * @param {object} props palette and onSubmit
 */
function Main(props) {
  return (
    <div className="text-gray-900 bg-white p-4 h-screen w-screen flex">
      <Menu />
      <Code />
      <Palette palette={props.palette} />

      {/* passing onSubmit from App to Form */}
      {/* <Form onSubmit={props.onSubmit} /> */}
    </div>
  );
}

export default Main;
