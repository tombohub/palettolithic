import React from "react";

function Header() {
  return (
    <header>
      <h1 className="text-2xl mt-6">Color palette creator</h1>
      <p className="mt-4">
        Provide a single color hex value and generate full color
        palette. Ready for Tailwindcss.
      </p>
    </header>
  );
}

export default Header;
