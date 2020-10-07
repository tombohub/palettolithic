import React, { useState } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import Palette from "./components/Palette";
import { createPalette } from "./scripts/createPalette";

function App() {
  /**
   * Palette is the collection of shades for each color. Curently 12 colors with 10 shades each.
   * {color:[shades],....}. createPalette function is used to create a collection after form submit
   */
  const [palette, setPalette] = useState({});

  return (
    <div className="text-center text-gray-800 container mx-auto">
      <Header />

      {/* When form is submitted we use the createPallete() function 
      to create palette and set it as a state */}
      <Form onSubmit={value => setPalette(createPalette(value))} />

      <Palette palette={palette} />
    </div>
  );
}

export default App;
