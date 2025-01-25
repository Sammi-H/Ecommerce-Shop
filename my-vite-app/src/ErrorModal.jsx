import React from "react";
import ReactDOM from "react-dom";

function ErrorModal({ message, onClose }) {
    return ReactDOM.createPortal(
        <div className="modal">
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onClose} className="modal-btn">Close</button>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

export default ErrorModal;
