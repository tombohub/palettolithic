// packages
import { HexColorInput, HexColorPicker } from "react-colorful";

// custom css for color picker
import "./menu.css";

type Props = {
  /**
   * color hex value
   */
  color: string;
  onColorChange: (newColor: string) => void;
};
export default function ColorPicker(props: Props) {
  return (
    <>
      <HexColorPicker color={props.color} onChange={props.onColorChange} />
      <HexColorInput
        placeholder={"HEX code"}
        color={props.color}
        onChange={props.onColorChange}
        className="bg-gray-200 rounded p-2 border w-full "
      />
    </>
  );
}
