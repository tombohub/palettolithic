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
      <ColorPicker />

      <FrameworkList />

      <MenuBottom />
    </>
  );
}

export default MenuBox;
