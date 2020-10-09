import React, { useEffect, useState } from "react";
import { createPalette } from "./scripts/createPalette";
import Tailwindcss from "./components/Tailwindcss";
import { Switch, Route } from "react-router-dom";
import Main from "./components/Main";

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

  /**
   * Routes are here because I wanted the routes for download be clear pages
   * with only code displayed
   */
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Main
            palette={palette}
            onSubmit={v => setPalette(createPalette(v))}
          />
        </Route>
        <Route path="/tailwindcss">
          <Tailwindcss palette={palette} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
