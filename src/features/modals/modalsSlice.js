import {createSlice} from '@reduxjs/toolkit';

export const ModalSlice = createSlice({
    name: "modal",
    initialState: {
        isOpen: false,
        modalType: null
    },
    reducers: {
        showModal: (state) => {
            state.isOpen = true;
        },
        hideModal: (state) => {
            state.isOpen = false;
        },
        setModalType: (state, action) => {
            state.modalType = action.payload;
        }
    }
});

export default ModalSlice.reducer;
export const {showModal, hideModal, setModalType} = ModalSlice.actions;

export const selectIsModalOpen = state => state.modal.isOpen;
export const selectModalType = state => state.modal.modalType;