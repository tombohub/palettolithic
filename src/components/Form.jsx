import React, { useState } from "react";

/**
 * Form for choosing the base color from which pallete will be generated
 */
function Form(props) {
  /**
   * Base color is the hex value of the color which user has entered in order to create
   * the color palette that will match the base color
   */
  const [baseColor, setBaseColor] = useState("#07c");

  /**
   * On submit form, passes the state of base color to the parent App component,
   * which then creates a palette. Palette is then passed to Palette component
   * @param {event} e form on submit event
   */
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(baseColor);
  }

  return (
    <form
      action=""
      className="mt-8 h-14 flex justify-center"
      onSubmit={handleSubmit}
    >
      {/* box to show current color. gets value from baseColor current state */}
      <div
        style={{ backgroundColor: baseColor }}
        className="w-24"
      ></div>

      {/* input field to input the base color. On change it changes state of base Color */}
      <input
        type="text"
        name="base-color"
        id="base-color"
        placeholder={baseColor}
        className="shadow border border-black ml-8 p-2"
        onChange={e => setBaseColor(e.target.value)}
      />

      {/* button to submit the form (base color) */}
      <button
        type="submit"
        className="shadow ml-8 p-2 h-full bg-black text-white border-2 border-black hover:bg-transparent hover:text-black"
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
