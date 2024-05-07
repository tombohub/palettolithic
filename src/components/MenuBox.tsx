// components
import FrameworkList from "./FrameworkList";
import MenuBottom from "./MenuBottom";
import ColorPicker from "./ColorPicker";

// custom css for color picker
import "./menu.css";
import { Framework } from "../core/domain";

interface Props {
  activeFramework: Framework;

  /**
   * Change of selected framework event
   */
  onFrameworkChange: (framework: Framework) => void;
}
/**
 * WHAT: menu box to hold color picker and frameworks menu items
 * @param {*} props
 */
function MenuBox(props: Props) {
  return (
    <>
      <div className="col-span-2 row-span-7">
        <ColorPicker />

        <FrameworkList
          activeFramework={props.activeFramework}
          onFrameworkChange={props.onFrameworkChange}
        />

        <div className="mt-32">
          <MenuBottom />
        </div>
      </div>
    </>
  );
}

export default MenuBox;
