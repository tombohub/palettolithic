import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { appActions } from "@/store/slices/appSlice";
import { type Framework } from "@/core";
import { NavLink } from "@mantine/core";

interface Props {
  framework: Framework;
}

/**
 * WHAT: Menu Item in framework menu. Parent is FrameworkList
 * WHY: There's more than one framework user can chose so it deserves component
 */
function FrameworkItem(props: Props) {
  const dispatch = useAppDispatch();
  const activeFramework = useAppSelector(state => state.app.activeFramework);

  const isActive = activeFramework === props.framework;

  function handleClick() {
    dispatch(appActions.setActiveFramework(props.framework));
  }
  return (
    <NavLink onClick={handleClick} label={props.framework} active={isActive} />
  );
}

export default FrameworkItem;
