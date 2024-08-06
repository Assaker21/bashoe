import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "./confirmation-dialog.component.scss";

export function ConfirmationDialog() {
  return (
    <ConfirmDialog
      draggable={false}
      className="confirmation-dialog"
      acceptClassName={"error"}
      rejectClassName={"primary"}
    />
  );
}

export function buildConfirmation(header, message, onAccept, onReject) {
  return confirmDialog({
    message: message,
    header: header,
    defaultFocus: "reject",
    accept: onAccept,
    reject: onReject,
  });
}
