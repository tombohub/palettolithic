import { Slider } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { appActions } from "@/store/slices/appSlice";
import { useState } from "react";

/**
 * Set the saturation modification factor using the slider input
 */
export default function SatModSlider() {
  const dispatch = useAppDispatch();
  const satMod = useAppSelector(state => state.app.saturationMod);
  const [value, setValue] = useState(satMod);

  const debouncedHueChange = useDebouncedCallback((value: number) => {
    dispatch(appActions.setSatMod(value));
  }, 300);

  function handleChange(value: number) {
    setValue(value);
    debouncedHueChange(value);
  }

  return (
    <>
      <Slider
        min={-1}
        max={1}
        step={0.01}
        marks={[
          { value: 0, label: 0 },
          { value: -1, label: -1 },
          { value: 1, label: 1 },
        ]}
        value={value}
        onChange={handleChange}
        styles={{
          bar: { backgroundColor: "transparent" },
          mark: { borderColor: "transparent" },
        }}
      />
    </>
  );
}
