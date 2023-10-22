import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import {forwardRef, useEffect} from "react";
import PropTypes from "prop-types";
import {CgClose} from "react-icons/cg";

const modalRoot = document.getElementById("modals");

const Modal = forwardRef(({children, closeModal}, ref) => {

    useEffect(() => {
        const handleEscClose = (e) => {
            if (e.key === "Escape") {
                closeModal();
            }
        }
        document.addEventListener('keydown', handleEscClose);
        return () => {
            document.removeEventListener('keydown', handleEscClose);
        }
    }, [closeModal])

    return ReactDOM.createPortal(
        <div ref={ref}>
            <div className={`${styles.modal}`}>
                <button type="button" className={styles['exit-button']} onClick={closeModal}>
                    <CgClose/>
                </button>
                {children}
            </div>
            <ModalOverlay onClose={closeModal}/>
        </div>, modalRoot
    );
});

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default Modal;