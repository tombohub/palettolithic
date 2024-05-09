import { ColorInput as MantineColorInput } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { appActions } from "@/store/slices/appSlice";

export default function ColorInput() {
  const dispatch = useAppDispatch();
  const colorHexValue = useAppSelector(state => state.app.pickedHexValue);
  const isValidHex = useAppSelector(state => state.app.isValidHex);
  const [, setSearchParams] = useSearchParams();

  function handleColorChange(hexValue: string) {
    dispatch(appActions.setHexValue(hexValue));
    setSearchParams({ color: hexValue.replace("#", "") }, { replace: true });
  }
  return (
    <>
      <MantineColorInput
        value={colorHexValue}
        onChange={handleColorChange}
        withPicker={false}
        error={!isValidHex}
      />
    </>
  );
}
