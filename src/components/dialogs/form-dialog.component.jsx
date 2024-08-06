import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import "./form-dialog.component.scss";
import { X } from "lucide-react";
import { ProgressSpinner } from "primereact/progressspinner";
import { useNavigate } from "react-router-dom";

export default function FormDialog({
  visible,
  setVisible,
  header,
  loading,
  children,
  onClose,
  onSave,
  saveEnabled,
  saveLoading,
}) {
  return (
    <Dialog
      header={<h2 className="form-dialog-header">{header}</h2>}
      footer={
        <div className="form-dialog-footer">
          <button
            className="warning"
            onClick={() => {
              setVisible(false);
              onClose && onClose();
            }}
          >
            Cancel
          </button>
          <button
            className={`primary ${
              !saveEnabled || saveLoading ? "disabled" : ""
            }`}
            onClick={onSave}
          >
            {!saveLoading ? (
              "Save"
            ) : (
              <ProgressSpinner
                style={{
                  height: "12px",
                  width: "30px",
                  padding: 0,
                  opacity: 1,
                }}
                strokeWidth="8"
              />
            )}
          </button>
        </div>
      }
      draggable={false}
      maximizable
      modal={true}
      visible={visible}
      className="form-dialog"
      onHide={() => {
        if (!visible) return;
        setVisible(false);
        onClose && onClose();
      }}
      loading={Boolean(loading)}
    >
      {loading ? (
        <div className="form-dialog-loading">
          <ProgressSpinner
            style={{ width: "35px", height: "35px" }}
            strokeWidth="4"
            animationDuration=".5s"
          />
        </div>
      ) : (
        children
      )}
    </Dialog>
  );
}
