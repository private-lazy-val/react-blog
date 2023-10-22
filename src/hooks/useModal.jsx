import {useCallback} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {
    showModal,
    hideModal,
    setModalType
} from '../features/modals/modalsSlice';

const useModal = () => {
    const dispatch = useDispatch();

    const isModalOpen = useSelector(state => state.modal.isOpen);
    const modalType = useSelector(state => state.modal.modalType);

    const openConfirmDeleteModal = useCallback(() => {
        dispatch(showModal());
        dispatch(setModalType('confirm-delete'));
    }, [dispatch]);

    const openViewImageModal = useCallback(() => {
        dispatch(showModal());
        dispatch(setModalType('view-image'));
    }, [dispatch]);

    const closeModal = useCallback(() => {
        dispatch(hideModal());
        dispatch(setModalType(null));
    }, [dispatch]);

    return {
        isModalOpen,
        modalType,
        openConfirmDeleteModal,
        openViewImageModal,
        closeModal
    };
};

export default useModal;