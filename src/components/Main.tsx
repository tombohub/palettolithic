// components
import Palette from "./Palette";
import MenuBox from "./MenuBox";
import ConfigurationCodeBox from "./ConfigurationCodeBox.js";
import Header from "./Header";

/**
 * Main component that displays the first page with form and palette
 */
function Main() {
  return (
    <>
      <div
        className="font-mono text-gray-900 bg-white p-2 h-screen w-screen grid
                    grid-cols-12 grid-rows-8 gap-2"
      >
        <Header />
        <Palette />
        <MenuBox />
        <ConfigurationCodeBox />
      </div>
    </>
  );
}

export default Main;
