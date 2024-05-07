import { HexColorInput, HexColorPicker } from "react-colorful";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { colorPickActions } from "@/store/slices/colorPickSlice";
import { useDebouncedCallback } from "@mantine/hooks";

// custom css for color picker
import "./menu.css";

export default function ColorPicker() {
  const dispatch = useAppDispatch();
  const colorHexValue = useAppSelector(state => state.palette.pickedHexValue);

  const handleColorChange = useDebouncedCallback((hexValue: string) => {
    dispatch(colorPickActions.setHexValue(hexValue));
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
