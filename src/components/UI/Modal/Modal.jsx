import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { modalActions } from "../../../store/Modal/modal-state";

import closeIcon from "../../../icons/close.svg";
import successIcon from "../../../icons/success.svg";
import errorIcon from "../../../icons/error.svg";
import classes from "./Modal.module.css";
import Backdrop from "../Spinkit/Backdrop";

function Modal() {
  const { isOpen, content, type } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalActions.closeModal());
  };

  if (!isOpen) return;

  return (
    <Backdrop>
      <div className={classes.modal}>
        <div className={classes.header}>
          <p>Notify</p>
          <img src={closeIcon} alt="close" onClick={closeModal} />
        </div>
        <hr />

        <div className={classes.content}>
          <img src={type === "error" ? errorIcon : successIcon} alt="icon" />
          <p>{content}</p>
        </div>

        <div className={classes.action}>
          <button onClick={closeModal}>OK</button>
        </div>
      </div>
    </Backdrop>
  );
}

export default Modal;
