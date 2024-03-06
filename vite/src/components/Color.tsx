import Shade from "./Shade";
import { ColorName } from "../scripts/domain";

interface Props {
  /**
   * hex values of each shade
   */
  shades: string[];

  color: ColorName;
}

/**
 * Hold Shades of single Color. It lists all the Shades of the Color passed in props from
 * Pallete component.
 * @param {object} props passed from App->Palette. Single color
 */
export default function Color(props: Props) {
  if (!Array.isArray(props.shades)) return false;
  return (
    <div className="flex-1 rounded p-1" data-name="color-outer">
      <div className="grid grid-cols-11 gap-1 h-full" data-name="color-inner">
        <span className="my-auto">{props.color.toUpperCase()}:</span>
        {props.shades.map((shade, i) => (
          <Shade key={i} shade={shade} />
        ))}
      </div>
    </div>
  );
}
