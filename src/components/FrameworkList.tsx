// components
import FrameworkItem from "./FrameworkItem";
import { useAppSelector } from "@/hooks/useAppSelector";

/**
 * WHAT: Menu list of frameworks to choose from.
 * The code will display based on active framework
 */
function FrameworkList() {
  const frameworks = useAppSelector(state => state.app.frameworks);
  return (
    <ul className="pt-12">
      {frameworks.map(framework => (
        <FrameworkItem framework={framework} key={framework} />
      ))}
    </ul>
  );
}

export default FrameworkList;
