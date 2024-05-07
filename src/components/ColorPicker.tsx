import { HexColorInput, HexColorPicker } from "react-colorful";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { colorPickActions } from "@/store/slices/paletteSlice";
import { useDebouncedCallback } from "@mantine/hooks";
import { useSearchParams } from "react-router-dom";

// custom css for color picker
import "./menu.css";

export default function ColorPicker() {
  const dispatch = useAppDispatch();
  const colorHexValue = useAppSelector(state => state.palette.pickedHexValue);
  /**
   * WHAT: color provided in the URL using react-router-dom
   * WHY: allow a user to provide a color upon starting the page
   */
  const [, setSearchParams] = useSearchParams();

  const handleColorChange = useDebouncedCallback((hexValue: string) => {
    dispatch(colorPickActions.setHexValue(hexValue));
    setSearchParams({ color: hexValue.replace("#", "") }, { replace: true });
  }, 300);

  return (
    <>
      <HexColorPicker color={colorHexValue} onChange={handleColorChange} />
      <HexColorInput
        placeholder={"HEX code"}
        color={colorHexValue}
        onChange={handleColorChange}
        className="bg-gray-200 rounded p-2 border w-full"
      />
    </>
  );
}
