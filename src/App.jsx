import React, { useEffect, useState } from "react";
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

  /**
   * WHAT: renders the initial demo pallete on first page visit
   * WHY: so user can immediately see an example
   */
  useEffect(() => {
    const initialPallete = createPalette("#07c");
    setPalette(initialPallete);
  }, []);

  return (
    <div className="text-center text-gray-900 bg-gray-100">
      <div className="container mx-auto">
        <Header />

        {/* When form is submitted we use the createPallete() function 
      to create palette and set it as a state */}
        <Form onSubmit={value => setPalette(createPalette(value))} />

        <Palette palette={palette} />
      </div>
    </div>
  );
}

export default App;
