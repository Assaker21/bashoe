import { useLocation } from "react-router-dom";
import "./page-header.component.scss";
import { ArrowLeft } from "lucide-react";
import { ProgressSpinner } from "primereact/progressspinner";

export default function PageHeader({ title, hasBack, onClickBack, loading }) {
  return (
    <div className="page-header">
      {hasBack && (
        <button className="icon" onClick={onClickBack}>
          <ArrowLeft className="icon-item" size={20} />
        </button>
      )}
      {loading ? (
        <ProgressSpinner
          style={{
            height: "20px",
            width: "20px",
            margin: "20px 0",
          }}
          strokeWidth="5"
        />
      ) : (
        <h1>{title}</h1>
      )}
    </div>
  );
}
