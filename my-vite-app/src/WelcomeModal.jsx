import React from "react";
import ReactDOM from "react-dom";

function WelcomeModal({ username, onClose }) {
    return ReactDOM.createPortal(
        <div className="modal">
            <div className="modal-content">
                <h2>Välkommen, {username}!</h2>
                <p>Du har loggat in. Klicka på "OK" för att fortsätta shoppa.</p>
                <button onClick={onClose} className="modal-btn">OK</button>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

export default WelcomeModal;
