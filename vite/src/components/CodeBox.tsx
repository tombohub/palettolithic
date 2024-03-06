// components
import { ColorScale, Framework } from "../scripts/domain";
import CodeContent from "./CodeContent";

interface Props {
  activeFramework: Framework;
  palette: ColorScale[];
}

/**
 * Box in which we will render the generated code of chosen framework
 */
function CodeBox(props: Props) {
  return (
    <div
      id="code-area"
      className="col-span-2 row-span-7 bg-gray-900 text-sm text-gray-100 p-2 rounded overflow-auto"
    >
      <CodeContent
        activeFramework={props.activeFramework}
        palette={props.palette}
      />
    </div>
  );
}

export default CodeBox;
