import React from "react";

/**
 * WHAT: holds the title of the website
 */
function Header() {
  return (
    <header className="col-span-4 rounded shadow">
      <h1 className="text-4xl text-gray-900 font-frijole">
        Palettolithic
      </h1>
      <h6 className="font-schoolbell text-2xl text-gray-800">
        So easy caveman can do it.
      </h6>
    </header>
  );
}

export default Header;
