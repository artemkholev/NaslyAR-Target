import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
  isOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const initialState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state: any) => {
      state.isOpen = !state.isOpen;
    },
    openSidebar: (state: any) => {
      state.isOpen = true;
    },
    closeSidebar: (state: any) => {
      state.isOpen = false;
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;