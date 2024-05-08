// components
import FrameworkList from "./FrameworkList";
import MenuBottom from "./MenuBottom";
import ColorPicker from "./ColorPicker";

// custom css for color picker
import "./menu.css";

/**
 * WHAT: menu box to hold color picker and frameworks menu items
 */
function MenuBox() {
  return (
    <>
      <div className="col-span-2 row-span-7">
        <ColorPicker />

        <FrameworkList />

        <div className="mt-32">
          <MenuBottom />
        </div>
      </div>
    </>
  );
}

export default MenuBox;
