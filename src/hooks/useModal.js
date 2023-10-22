import {useCallback} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {
    openModal,
    closeModal,
    setModalType
} from '../features/modals/modalsSlice';

const useModal = () => {
    const dispatch = useDispatch();

    const isModalOpen = useSelector(state => state.modal.isOpen);
    const modalType = useSelector(state => state.modal.modalType);

    const closeConfirmDeleteModal = useCallback(() => {
        dispatch(closeModal());
        dispatch(setModalType(null));
    }, [dispatch]);

    const openConfirmDeleteModal = useCallback(() => {
        dispatch(openModal());
        dispatch(setModalType('confirm-delete'));
    }, [dispatch]);

    return {
        isModalOpen,
        modalType,
        closeConfirmDeleteModal,
        openConfirmDeleteModal
    };
};

export default useModal;