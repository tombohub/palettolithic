import React from "react";
import Form from "./Form";
import Palette from "./Palette";
import Menu from "./Menu";

/**
 * Main component that displays the first page with form and palette
 * @param {object} props palette and onSubmit
 */
function Main(props) {
  return (
    <div className="text-gray-900 bg-gray-100 p-4 flex">
      <div className="container mx-auto">
        <Menu />

        {/* passing onSubmit from App to Form */}
        <Form onSubmit={props.onSubmit} />

        <Palette palette={props.palette} />
      </div>
    </div>
  );
}

export default Main;
