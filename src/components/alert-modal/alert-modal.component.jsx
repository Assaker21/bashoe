import "./alert-modal.component.scss";
import React, { useState, useEffect } from "react";

export default function AlertModal({ openSignal, onYes, onCancel }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (openSignal) toggleModal();
  }, [openSignal]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <p>Are you sure you want to delete this item?</p>
            </div>
            <br />
            <div className="modal-body">
              <div className="modal-buttons-container">
                <button
                  className="modal-button modal-button-no"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  className="modal-button modal-button-yes"
                  onClick={() => {
                    if (onYes) onYes();
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
