import React from "react";

/**
 * WHAT: holds the title of the website
 */
function Header() {
  return (
    <header className="col-span-4 rounded shadow">
      <h1 className="lg:text-4xl md:text-3xl text-gray-900 font-frijole inline-block">
        Palettolithic
      </h1>
      <h6 className="font-schoolbell md:text-xl lg:text-2xl text-gray-800 inline-block">
        So easy caveman can do it.
      </h6>
    </header>
  );
}

export default Header;
