// components
import FrameworkList from "./FrameworkList";
import MenuBottom from "./MenuBottom";
import ColorPicker from "./ColorPicker";
import ColorInput from "./ColorInput";

/**
 * WHAT: menu box to hold color picker and frameworks menu items
 */
function MenuBox() {
  return (
    <>
      <ColorPicker />
      <ColorInput />
      <FrameworkList />

      <MenuBottom />
    </>
  );
}

export default MenuBox;
