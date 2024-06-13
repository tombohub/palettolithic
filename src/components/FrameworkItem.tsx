import { Framework } from "../core/domain/domain";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { appActions } from "@/store/slices/appSlice";

interface Props {
  framework: Framework;
}

/**
 * WHAT: Menu Item in framework menu. Parent is FrameworkList
 * WHY: There's more than one framework user can chose so it deserves component
 */
function FrameworkItem(props: Props) {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(appActions.setActiveFramework(props.framework));
  }
  return <li onClick={handleClick}>{props.framework}</li>;
}

export default FrameworkItem;
