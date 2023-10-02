import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    data: [],
    isModalVisible: false,
    setIsSearchModal: true,
  },
  reducers: {
    setModalData(state, action) {
      state.data = action.payload;
    },
    setIsModalVisible(state, action) {
      state.isModalVisible = action.payload;
    },
    setIsSearchModal(state, action) {
      state.setIsSearchModal = action.payload;
    },
  },
});

export const { setModalData, setIsModalVisible, setIsSearchModal } =
  modalSlice.actions;
export default modalSlice.reducer;
