import React, { PropsWithChildren, useState } from "react";
import ReactDOM from "react-dom";

type ModalDialogProps = {
    // isOpen: boolean;
    onClose: () => void;
};

const modalStyles: React.CSSProperties = {
    // display: isOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    color: "#000",
};

const contentStyles: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    padding: "20px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
};

const ModalDialog: React.FC<PropsWithChildren<ModalDialogProps>> = ({
    // isOpen,
    onClose,
    children,
}) => {
    // if (!isOpen) return null;
    return ReactDOM.createPortal(
        <>
            <div style={modalStyles}>
                <div style={contentStyles}>
                    {children}
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </>,
        document.getElementById("portal") as HTMLElement
    );
};

export default ModalDialog;
