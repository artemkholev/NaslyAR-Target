import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import { toggleSidebar, openSidebar, closeSidebar } from "../store";

export const useSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  const toggle = () => dispatch(toggleSidebar());
  const open = () => dispatch(openSidebar());
  const close = () => dispatch(closeSidebar());

  return { isOpen, toggleSidebar: toggle, openSidebar: open, closeSidebar: close };
};
