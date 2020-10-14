import React from "react";

/**
 * WHAT: holds the title of the website
 */
function Header() {
  return (
    <header className="col-span-4">
      <h1 className="text-3xl font-semibold font-mono">
        Palettolithic
      </h1>
      <span className="text-sm">
        Most beautiful colors in history.
      </span>
    </header>
  );
}

export default Header;
