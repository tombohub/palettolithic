import React from "react";

function Header() {
  return (
    <header>
      <h1 className="text-3xl font-semibold font-mono pt-10">
        Color palette creator
      </h1>
      <p className="text-lg mt-4">
        Provide a single color hex value and generate full color
        palette. Ready for Tailwindcss.
      </p>
    </header>
  );
}

export default Header;
