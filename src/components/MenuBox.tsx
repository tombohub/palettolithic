import FrameworkList from "./FrameworkList";
import HueModSlider from "./HueModSlider";
import MenuBottom from "./MenuBottom";
import ModPicker from "./ModPicker";
import SatModSlider from "./SatModSlider";

/**
 * WHAT: menu box to hold color picker and frameworks menu items
 */
function MenuBox() {
  return (
    <>
      {/* <ModPicker /> */}
      <HueModSlider />
      <SatModSlider />
      <FrameworkList />

      <MenuBottom />
    </>
  );
}

export default MenuBox;
