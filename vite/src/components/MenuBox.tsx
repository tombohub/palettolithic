// components
import FrameworkList from "./FrameworkList";
import MenuBottom from "./MenuBottom";
import ColorPicker from "./ColorPicker";

// packages
import "react-colorful/dist/index.css";

// custom css for color picker
import "./menu.css";

interface Props {
  /**
   * active color hex value
   */
  hexValue: string;

  /**
   * when color changes event
   */
  onColorChange: (color: string) => void;

  activeFramework: string;

  /**
   * Change of selected framework event
   */
  onFrameworkChange: (framework: string) => void;
}
/**
 * WHAT: menu box to hold color picker and frameworks menu items
 * @param {*} props
 */
function MenuBox(props: Props) {
  return (
    <>
      <div className="col-span-2 row-span-7">
        <ColorPicker
          color={props.hexValue}
          onColorChange={props.onColorChange}
        />

        <FrameworkList
          activeFramework={props.activeFramework}
          setActiveFramework={props.onFrameworkChange}
        />

        <div className="mt-32">
          <MenuBottom />
        </div>
      </div>
    </>
  );
}

export default MenuBox;
